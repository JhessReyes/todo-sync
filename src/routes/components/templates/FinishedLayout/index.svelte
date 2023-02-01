<script lang="ts">
	import CardFinished from '../../molecules/CardFinished/index.svelte';
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
		promise = getEventsFinished(accessToken);
	});
</script>

{#if accessToken}
	<div>
		{#await promise}
			<progress class="progress w-full h-2" />
		{:then res}
			{#each res.result.items as t}
				<CardFinished {t} />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
{:else}
	<SplashLoading />
{/if}
