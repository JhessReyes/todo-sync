<script lang="ts">
	import TodoCard from '../../molecules/TodoCard/index.svelte';
	import { onMount } from 'svelte';

	let allEvents: Array<[]> = [];

	onMount(async () => {
		let response;
		allEvents = [];
		try {
			const request = {
				calendarId: 'primary',
				timeMin: new Date().toISOString(),
				showDeleted: false,
				singleEvents: true,
				maxResults: 10,
				orderBy: 'startTime'
			};
			response = await gapi.client.calendar.events.list(request);
			console.log(response.result.items);
		} catch (err) {
			console.log(err);
			return;
		}

		const events = response.result.items;

		if (!events || events.length == 0) {
			//'No events found.'
			return;
		} /* 
		console.log(events); */
		allEvents = events;
	});
</script>

<div>
	<!-- 	<TodoCard allEvents={allEvents}/> -->
	{#each allEvents as t, i}
		<li>
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
		</li>
	{:else}
		this block renders when photos.length === 0
		<p>loading...</p>
	{/each}
	<!-- 	<TodoCard {allEvents} /> -->
</div>
