<script lang="ts">
	import InputTask from '../../atoms/InputTask/index.svelte';
	import ModalDate from '../../atoms/ModalDate/index.svelte';
	import SplashLoading from '../../molecules/SplashLoading/index.svelte';
	import { getEventsPlanned, createEvent } from '../../../providers/GoogleCalendar';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Index from '../../molecules/ModalComplete/index.svelte';
	let accessToken = browser ? window.sessionStorage.getItem('accessToken') : '';
	let promise = Promise.resolve([]);
	let promiseAdd = Promise.resolve([]);
	interface Todo {
		summary: string;
		startAt: string;
		endAt: string;
	}

	let todo: Todo = {
		summary: '',
		startAt: new Date().toISOString(),
		endAt: new Date().toISOString()
	};

	const resetTodo = (): void => {
		todo = {
			summary: '',
			startAt: new Date().toISOString(),
			endAt: new Date().toISOString()
		};
	};

	async function createTodo() {
		promiseAdd = createEvent(accessToken, todo.summary, todo.endAt, todo.startAt);
		promiseAdd.then((resolve) => {
			resetTodo();
			goto('/');
		});
	}

	onMount(async () => {
		if (!accessToken) {
			goto('/auth');
		}
		promise = getEventsPlanned(accessToken);
	});
</script>

{#if accessToken}
	<div>
		<div class="mx-10 my-10 sm:flex justify-center">
			<ModalDate bind:completeAt={todo.startAt} desc="Inicio" />
			<div class="mx-5 my-5">
				<InputTask bind:task={todo.summary} />
			</div>
			<ModalDate bind:completeAt={todo.endAt} desc="Fin" />
			{#if todo.summary != ''}
				<button class="btn btn-primary" on:click={() => createTodo()}>+</button>
			{/if}
		</div>
		{#await promise}
			<progress class="progress w-full h-2" />
		{:then res}
			{#each res.result.items as t}
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
								<Index {accessToken} modalId={t.id} />
							</div>
							{#if t.completeAt == ''}
								<button class="btn btn-secondary">Agregar Fecha de Vencimiento</button>
							{/if}
						</div>
					</label>
				</div>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
{:else}
	<SplashLoading />
{/if}
