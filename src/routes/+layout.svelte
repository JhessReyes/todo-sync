<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from './components/organisms/Navbar/index.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="google-signin-client_id"
		content="658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com"
	/>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
</svelte:head>

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
