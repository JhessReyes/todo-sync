<script lang="ts">
	import InputTask from '../../atoms/InputTask/index.svelte';

	interface Todo {
		task: string;
		isComplete: boolean;
		createdAt: string;
		completeAt: string;
	}

	let todos: Todo[] = [];

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

<div class="rounded-xl shadow-xl md:w-50 h-full">
	<InputTask bind:task={todo.task} />
	<input type="date" aria-placeholder="Agrega un plan" bind:value={todo.completeAt} />
	{#if todo.task != ''}
		<button on:click={addTodo}>Add</button>
	{/if}
	<ul>
		{#each todos as t}
			<li>
				<div class="form-control">
					<label class="cursor-pointer label">
						<div class="card-body">
							<div class={t.isComplete ? 'line-through italic' : ''}>
								<h2 class="card-title text-primary capitalize">{t.task}</h2>
							</div>
							<h4 class="text-primary text-[16px] italic py-2">{t.completeAt}</h4>
							<input
								type="checkbox"
								bind:checked={t.isComplete}
								class="checkbox checkbox-secondary"
							/>
							{#if t.completeAt == ''}
								<button>Agregar Fecha de Vencimiento</button>
							{/if}
						</div>
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
