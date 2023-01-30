<script lang="ts">
	import {
		gisInited,
		gapiInited,
		gapiLoaded,
		gisLoaded,
		maybeEnableButtons,
		handleAuthClick
	} from './index';

	export let token = '';
</script>

<button class="btn btn-primary" on:click={handleAuthClick}>LISTO</button>
<h1>{token}</h1>
