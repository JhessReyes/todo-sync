<script lang="ts">
	import HomeLayout from './components/templates/HomeLayout/index.svelte';
</script>

<section class="mr-10 ml-10" id="home">
	<div class="sm:columns-2 columns-1 w-full">
		<div class="overflow-auto rounded-xl shadow-xl">
			<h1 class="text-lg text-center text-primary font-extrabold">PLANEADO</h1>
			<HomeLayout />
		</div>
		<div class="overflow-auto rounded-xl my-5 shadow-xl">
			<h1 class="text-lg text-center text-primary font-extrabold">TERMINADO</h1>
			<HomeLayout />
		</div>
	</div>
</section>
