<script lang="ts">
	export let task = '';
</script>

<input
	class="input input-bordered input-secondary w-full max-w-xs"
	type="text"
	placeholder="Agrega una tarea"
	bind:value={task}
/>
