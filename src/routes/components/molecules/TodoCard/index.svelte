<script lang="ts">
	export let title = 'TITLE';
	interface Todo {
		task: string;
		isComplete: boolean;
		createdAt: string;
	}

	let todos: Todo[] = [
		{
			task: 'tasdgs',
			isComplete: false,
			createdAt: '2021-08-06'
		},
		{
			task: 'tasdgs',
			isComplete: true,
			createdAt: '2021-08-06'
		},
		{
			task: 'tasdgs',
			isComplete: true,
			createdAt: '2021-08-06'
		}
	];

	let todo: Todo = {
		task: '',
		isComplete: false,
		createdAt: new Date().toISOString()
	};

	const addTodo = (): void => {
		todos = [...todos, todo];
	};

	$: console.table(todos);
</script>

<div class="rounded-xl shadow-xl md:w-50 h-full">
	<input type="text" aria-placeholder="Agrega un plan" bind:value={todo.task} />
	<button on:click={addTodo}>Add</button>

	<ul>
		{#each todos as todo}
			<li class:complete={todo.isComplete}>{todo.task}</li>
		{/each}
	</ul>
	<div class="card-body">
		<h2 class="card-title text-primary capitalize">{title}</h2>
	</div>
</div>
