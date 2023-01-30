<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Navbar from './components/organisms/Navbar/index.svelte';
	import {
		gisInited,
		gapiInited,
		gapiLoaded,
		gisLoaded,
		maybeEnableButtons,
		checkLogged,
		tokenWeb
	} from './auth/index';
	import AuthPage from './auth/+page.svelte';
	/* import GoogleAuth from './providers/GoogleAuth/index.svelte';
	 */

	let googleToken = browser ? window.sessionStorage.getItem('googleToken') : '';
	let sigIn = false;
	let ready = false;
	onMount(async () => {
		maybeEnableButtons();
		gisLoaded();
		gapiLoaded();
		setTimeout(() => {
			if (gisInited && gapiInited) {
				ready = true;
			}
		}, 2000);
	});
	console.log(googleToken);
</script>

<svelte:head>
	<title>Homes</title>
	<meta
		name="google-signin-client_id"
		content="658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com"
	/>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
	<script async defer src="https://apis.google.com/js/api.js" on:load={gapiLoaded}></script>
	<script async defer src="https://accounts.google.com/gsi/client" on:load={gisLoaded}></script>
</svelte:head>

{#if ready}
	<AuthPage token={googleToken} />
	<div class="w-full h-full">
		<Navbar />
		<main>
			<slot />
			<!-- <div class="g-signin2" data-longtitle="true" data-onsuccess={() => authenticate()} />
			-->
			<!-- <button on:click={signOut}>Sign out</button> -->
			<!-- 
				<button on:click={() => authenticate()}>Sign out</button>
			-->
		</main>
		<footer />
	</div>
{/if}
