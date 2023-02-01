<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gisInited, gapiInited, gapiLoaded, gisLoaded } from './auth/index';
	import AuthPage from './auth/+page.svelte';
	import Navbar from './components/organisms/Navbar/index.svelte';
	import { goto } from '$app/navigation';
	let accessToken = browser ? window.sessionStorage.getItem('accessToken') : '';

	onMount(async () => {
		gisLoaded();
		gapiLoaded();
		setTimeout(() => {
			if (gisInited && gapiInited) {
				if (!accessToken) {
					goto('/auth');
				}
			}
		}, 500);
	});
</script>

<svelte:head>
	<title>Homes</title>
	<meta
		name="google-signin-client_id"
		content="658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
	<script async defer src="https://apis.google.com/js/api.js" on:load={gapiLoaded}></script>
	<script async defer src="https://accounts.google.com/gsi/client" on:load={gisLoaded}></script>
</svelte:head>

<div class="w-full h-full">
	<main>
		<slot />
	</main>
	<footer />
</div>
