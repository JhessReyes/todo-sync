<script lang="ts">
	export let t: any = [];
</script>

{#if t}
	<div class="form-control">
		<label class="cursor-pointer label">
			<div class="card-body">
				<div class="flex">
					<input disabled type="checkbox" checked={true} class="checkbox checkbox-secondary mx-2" />
					<div class={true ? 'line-through italic' : ''}>
						<h2 class="card-title text-primary capitalize">{t.summary}</h2>
					</div>
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
			</div>
		</label>
	</div>
{/if}
