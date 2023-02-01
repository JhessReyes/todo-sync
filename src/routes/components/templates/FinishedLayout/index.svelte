<script lang="ts">
	import TodoCard from '../../molecules/TodoCard/index.svelte';
	import SplashLoading from '../../molecules/SplashLoading/index.svelte';
	import { getEventsFinished } from '../../../providers/GoogleCalendar';
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
			promise = getEventsFinished(accessToken);
			console.log(promise);
		}, 500);
	});
</script>

{#if accessToken}
	<div>
		{#await promise}
			<progress class="progress w-full h-2" />
		{:then res}
			{#each res.result.items as t}
				<div class="form-control">
					<label class="cursor-pointer label">
						<div class="card-body">
							<div class="flex">
								<input type="checkbox" checked={true} class="checkbox checkbox-secondary mx-2" />
								<div class={true ? 'line-through italic' : ''}>
									<h2 class="card-title text-primary capitalize">{t.summary}</h2>
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

		<!-- 	<TodoCard {allEvents} /> -->
	</div>
{:else}
	<SplashLoading />
{/if}
