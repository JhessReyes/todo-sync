<script lang="ts">
	interface Todo {
		task: string;
		isComplete: boolean;
		createdAt: string;
	}

	let todos: Todo[] = [];

	let todo: Todo = {
		task: '',
		isComplete: false,
		createdAt: new Date().toISOString()
	};

	const resetTodo = (): void => {
		todo = {
			task: '',
			isComplete: false,
			createdAt: new Date().toISOString()
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
	<input type="text" aria-placeholder="Agrega un plan" bind:value={todo.task} />
	{#if todo.task != ''}
		<button on:click={addTodo}>Add</button>
	{/if}
	<ul>
		{#each todos as t}
			<li class={t.isComplete ? 'line-through italic' : ''}>
				<div class="form-control">
					<label class="cursor-pointer label">
						<div class="card-body">
							<h2 class="card-title text-primary capitalize">{t.task}</h2>
							<input
								type="checkbox"
								bind:checked={t.isComplete}
								class="checkbox checkbox-secondary"
							/>
						</div>
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
