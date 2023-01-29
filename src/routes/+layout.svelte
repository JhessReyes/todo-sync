<script>
	import '../app.css';
	import Header from '../routes/components/Header/index.svelte';
</script>

<div class="w-full h-full">
	<Header />
	<main>
		<slot />
	</main>
	<footer />
</div>
