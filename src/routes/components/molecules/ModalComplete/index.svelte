<script lang="ts">
	import { goto } from '$app/navigation';
	import GoogleCalendar from '../../../providers/GoogleCalendar/index';
	export let modalId = '';
	export let accessToken = '';
	let promise = Promise.resolve([]);
	async function confirm() {
		promise = GoogleCalendar.deleteEvent(accessToken, modalId);
		promise.then((resolve) => {
			goto('/');
		});
	}
</script>

<label for={modalId} class="btn bg-warning">Cancelar Evento</label>

<input type="checkbox" id={modalId} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">¿Estas seguro de borrar este evento?</h3>
		<div class="modal-action">
			<label for={modalId} class="btn btn-secondary">Cerrar</label>
			<button class="btn btn-success" on:click={() => confirm()}>Confirmar</button>
		</div>
		{#await promise}
			<progress class="progress w-full h-2" />
		{/await}
	</div>
</div>
