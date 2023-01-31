<script lang="ts">
	import InputTask from '../../atoms/InputTask/index.svelte';
	import ModalDate from '../../atoms/ModalDate/index.svelte';
	export let allEvents: Array<[]> = [];
	interface Todo {
		task: string;
		isComplete: boolean;
		createdAt: string;
		completeAt: string;
	}

	export let todos: any[] = [];

	let todo: Todo = {
		task: '',
		isComplete: false,
		createdAt: new Date().toISOString(),
		completeAt: ''
	};

	const resetTodo = (): void => {
		todo = {
			task: '',
			isComplete: false,
			createdAt: new Date().toISOString(),
			completeAt: ''
		};
	};

	const addTodo = (): void => {
		todos = [...todos, todo];
		resetTodo();
	};

	$: console.log(todo.task);
	$: console.table(todos);
</script>

<div class="rounded md:w-50 h-full">
	{#each todos as t}
		<div class="form-control">
			<label class="cursor-pointer label">
				<div class="card-body">
					<div class="flex">
						<input
							type="checkbox"
							bind:checked={t.isComplete}
							class="checkbox checkbox-secondary mx-5"
						/>
						<div class={t.isComplete ? 'line-through italic' : ''}>
							<h2 class="card-title text-primary capitalize">{t.task}</h2>
						</div>
					</div>
					<div class="justify-end">
						<div class="flex">
							<strong class="my-2 mx-2">Inicio: </strong>
							<h4 class="text-primary text-[16px] italic py-2">
								{t.start.date || t.start.dateTime}
							</h4>
						</div>
						<div class="flex">
							<strong class="my-2 mx-2">Fin: </strong>
							<h4 class="text-primary text-[16px] italic py-2">
								{t.end.date || t.end.dateTime}
							</h4>
						</div>
					</div>
					<input type="checkbox" bind:checked={t.isComplete} class="checkbox checkbox-secondary" />
					{#if t.completeAt == ''}
						<button class="btn btn-secondary">Agregar Fecha de Vencimiento</button>
					{/if}
				</div>
			</label>
		</div>
	{/each}
	<div class="mx-10 my-10 flex">
		<InputTask bind:task={todo.task} />
		<ModalDate bind:completeAt={todo.completeAt} />
		{#if todo.task != ''}
			<button class="btn btn-primary" on:click={addTodo}>+</button>
		{/if}
	</div>
</div>
