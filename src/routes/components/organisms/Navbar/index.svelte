<script lang="ts">
	import { page } from '$app/stores';
	import GoogleAuth from '../../../providers/GoogleAuth/index.svelte';

</script>

<svelte:head>
	<script async defer src="https://apis.google.com/js/api.js" on:load={() => gapiLoaded()}></script>
	<script async defer src="https://accounts.google.com/gsi/client" on:load={() => gisLoaded()}></script>
</svelte:head>
<header>
	<div class="mx-auto h-24 navbar">
		<div class="flex-1 h-24" aria-current={$page.url.pathname === '/planned' ? 'page' : undefined}>
			<a href="/"> LOGO </a>
		</div>

		<nav>
			<div class="flex-none just">
				<ul class="list-none sm:flex hidden justify-end items-center flex-1">
					<li
						class="text-[16px] cursor-pointer"
						aria-current={$page.url.pathname === '/planned' ? 'page' : undefined}
					>
						<a href="/planned">PLANEADO</a>
					</li>
					<li
						class="ml-20 text-[16px] cursor-pointer"
						aria-current={$page.url.pathname === '/finished' ? 'page' : undefined}
					>
						<a href="/finished">TERMINADO</a>
					</li>
				</ul>
			</div>

			<div class="ml-20">
				<ul class="list-none sm:flex hidden justify-end items-center flex-1">
					<li
						class="text-[16px] cursor-pointer"
						aria-current={$page.url.pathname === '/' ? 'page' : undefined}
					/>
					<GoogleAuth/>

				</ul>
			</div>
		</nav>
	</div>
	
</header>
