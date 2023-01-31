<script lang="ts">
	import { page } from '$app/stores';
	import { handleSignoutClick } from '../../../auth/index';
	export let linkPicture = '';
</script>

<header>
	<div class="mx-auto h-24 navbar">
		<div class="flex-1 h-24" aria-current={$page.url.pathname === '/planned' ? 'page' : undefined}>
			<button class="btn-ghost btn-lg rounded-2xl"
				><i class="fa fa-tasks text-primary" style="font-size:48px" />
			</button>
			<a href="/" />
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
					<div>
						<div class="avatar">
							<div class="w-12 rounded-xl mx-5">
								<button
									class="text-red-500 font-bold rounded-lg"
									on:click={() => handleSignoutClick()}
								>
									<img class="cursor-pointer" src={linkPicture} />
								</button>
							</div>
						</div>
					</div>
				</ul>
			</div>
		</nav>
	</div>
</header>
