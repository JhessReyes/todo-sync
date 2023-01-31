<script lang="ts">
	import HomeLayout from './components/templates/HomeLayout/index.svelte';
	import { onMount } from 'svelte';
	import Navbar from './components/organisms/Navbar/index.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { gisInited, gapiInited } from './auth/index';
	let accessToken = browser ? window.sessionStorage.getItem('accessToken') : '';
	let picture = browser ? window.sessionStorage.getItem('picture') : '';
	onMount(async () => {
		if (gisInited && gapiInited) {
			if (!accessToken) {
				goto('/auth');
			}
		}
	});
</script>

<section class="mr-10 ml-10" id="home">
	<Navbar linkPicture={picture} />
	<div class="sm:columns-2 columns-1 w-full">
		<div class="overflow-auto rounded-xl shadow-xl">
			<h1 class="text-lg text-center text-primary font-extrabold">PLANEADO</h1>
			<HomeLayout />
		</div>
		<!-- 		<div class="overflow-auto rounded-xl my-5 shadow-xl">
			<h1 class="text-lg text-center text-primary font-extrabold">TERMINADO</h1>
			<HomeLayout />
		</div>
	</div> -->
	</div>
</section>
