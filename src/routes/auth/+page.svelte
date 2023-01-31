<script lang="ts">
	import { handleAuthClick } from './index';
	/* 	import { browser } from '$app/environment';
	let accessToken = browser ? window.sessionStorage.getItem('accessToken') : ''; */
</script>

<div>
	<button class="btn btn-primary" on:click={handleAuthClick}>LISTO</button>
</div>
