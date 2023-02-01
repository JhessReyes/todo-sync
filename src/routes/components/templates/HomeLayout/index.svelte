<script lang="ts">
	import Card from '../../molecules/Card/index.svelte';
	import InputTask from '../../atoms/InputTask/index.svelte';
	import ModalDate from '../../atoms/ModalDate/index.svelte';
	import SplashLoading from '../../molecules/SplashLoading/index.svelte';
	import { getEventsPlanned, createEvent } from '../../../providers/GoogleCalendar';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
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
				<Card {accessToken} {t} />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
{:else}
	<SplashLoading />
{/if}
