<script>
	import '../app.css';
	import Navbar from './components/organisms/Navbar/index.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="To Do Synchronized" />
</svelte:head>

<div class="w-full h-full">
	<Navbar />
	<main>
		<slot />
	</main>
	<footer />
</div>
