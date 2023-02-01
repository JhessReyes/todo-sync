<script lang="ts">
	import Modal from '../ModalComplete/index.svelte';
	export let t: any = [];
	export let accessToken: string = '';
</script>

{#if t}
	<div class="form-control">
		<label class="cursor-pointer label">
			<div class="card-body">
				<div class="flex">
					<input
						type="checkbox"
						bind:checked={t.isComplete}
						class="checkbox checkbox-secondary mx-2"
					/>
					<div class={t.isComplete ? 'line-through italic' : ''}>
						<h2 class="card-title text-primary capitalize">{t.summary}</h2>
					</div>
				</div>
				<div class="card-actions">
					<span
						class="bg-gray-200 rounded-full mx-1 my-1 px-3 py-1 text-sm font-semibold text-gray-400"
					>
						{t.status}
					</span>
				</div>
				<div class="justify-end">
					<div class="flex">
						<strong class="my-2 mx-2">Inicio: </strong>
						<h4 class="text-primary text-[16px] italic py-2">
							{t.start.date || t.start.dateTime}
						</h4>
					</div>
					<div class="flex">
						<strong class="my-2 mx-2">Fin: </strong>
						<h4 class="text-primary text-[16px] italic py-2">
							{t.end.date || t.end.dateTime}
						</h4>
					</div>
				</div>
				<div class="justify-end">
					<Modal {accessToken} modalId={t.id} />
				</div>
			</div>
		</label>
	</div>
{/if}
