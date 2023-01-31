<script lang="ts">
	import TodoCard from '../../molecules/TodoCard/index.svelte';
	import { getEventsPlanned } from '../../../providers/GoogleCalendar';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	let accessToken = browser ? window.sessionStorage.getItem('accessToken') : '';
	let promise = Promise.resolve([]);

	onMount(async () => {
		if (!accessToken) {
			goto('/auth');
		}
		setTimeout(() => {
			promise = getEventsPlanned(accessToken);
			console.log(promise);
		}, 500);
	});
</script>

<div>
	{#await promise}
		<div>Cargando...</div>
	{:then res}
		{#each res.result.items as t}
			<div class="form-control">
				<label class="cursor-pointer label">
					<div class="card-body">
						<div class={t.isComplete ? 'line-through italic' : ''}>
							<h2 class="card-title text-primary capitalize">{t.summary}</h2>
						</div>
						<h4 class="text-primary text-[16px] italic py-2">{t.end.date || t.end.dateTime}</h4>
						<input
							type="checkbox"
							bind:checked={t.isComplete}
							class="checkbox checkbox-secondary"
						/>
						{#if t.completeAt == ''}
							<button class="btn btn-secondary">Agregar Fecha de Vencimiento</button>
						{/if}
					</div>
				</label>
			</div>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
	<!-- 	<TodoCard allEvents={allEvents}/> -->
	<!-- 	<TodoCard {allEvents} /> -->
</div>
