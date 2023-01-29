<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="mx-auto h-24 navbar">
		<div class="flex-1 h-24">
			<a href="https://kit.svelte.dev"> logo </a>
		</div>

		<nav>
			<div class="flex-none just">
				<ul class="list-none sm:flex hidden justify-end items-center flex-1">
					<li
						class="text-[16px] cursor-pointer"
						aria-current={$page.url.pathname === '/' ? 'page' : undefined}
					>
						<a href="/">INICIO</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="ml-20">
			<ul class="list-none sm:flex hidden justify-end items-center flex-1">
				<li
					class="text-[16px] cursor-pointer"
					aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				>
					<a href="/">user</a>
				</li>
			</ul>
		</div>
	</div>
</header>
