<script lang="ts">
	import HomeLayout from './components/templates/HomeLayout/index.svelte';
</script>

<section id="home">
	<div class="container columns-2">
		<div class="w-full">
			<div class="overflow-auto rounded-xl shadow-xl md:w-50 h-full w-full">
				<h1>PLANEADO</h1>
				<HomeLayout />
			</div>
			<div class="overflow-auto rounded-xl shadow-xl md:w-50 h-full">
				<h1>TERMINADO</h1>
				<HomeLayout />
			</div>
		</div>
	</div>
</section>
