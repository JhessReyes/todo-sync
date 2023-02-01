<script lang="ts">
	export let completeAt: any;
	export let desc = '';
</script>

<div class="flex-none">
	<div class="mx-10">
		<span class="text-xs">{desc}</span>
	</div>
	<div>
		<input
			class="mx-1"
			type="datetime-local"
			placeholder="Agrega Fecha de Vencimiento"
			bind:value={completeAt}
		/>
	</div>
</div>
