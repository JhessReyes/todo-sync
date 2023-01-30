<svelte:head>
	<script async defer src="https://apis.google.com/js/api.js" on:load={() => gapiLoaded()}></script>
	<script async defer src="https://accounts.google.com/gsi/client" on:load={() => gisLoaded()}></script>
</svelte:head>

<script lang="ts">
	// TODO(developer): Set to client ID and API key from the Developer Console
	const CLIENT_ID = '658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com';
	const API_KEY = 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4';

	// Discovery doc URL for APIs used by the quickstart
	const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

	// Authorization scopes required by the API; multiple scopes can be
	// included, separated by spaces.
	const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

	export let tokenClient;
	export let gapiInited = false;
	export let gisInited = false;
	export let sigIn = false;

	/**
	 * Callback after api.js is loaded.
	 */
	export function gapiLoaded() {
		gapi.load('client', initializeGapiClient);
	}

	/**
	 * Callback after the API client is loaded. Loads the
	 * discovery doc to initialize the API.
	 */
	async function initializeGapiClient() {
		await gapi.client.init({
			apiKey: API_KEY,
			discoveryDocs: [DISCOVERY_DOC]
		});
		gapiInited = true;
		maybeEnableButtons();
	}

	/**
	 * Callback after Google Identity Services are loaded.
	 */
	 export function gisLoaded() {
		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: '' // defined later
		});
		gisInited = true;
		maybeEnableButtons();
	}

	/**
	 * Enables user interaction after all libraries are loaded.
	 */
	function maybeEnableButtons() {
		if (gapiInited && gisInited) {
			/* 	document.getElementById('authorize_button').style.visibility = 'visible'; */
		}
	}

	/**
	 *  Sign in the user upon button click.
	 */
	export function handleAuthClick() {
		tokenClient.callback = async (resp) => {
			if (resp.error !== undefined) {
				throw resp;
			}
			sigIn = true;
			await listUpcomingEvents();
		};

		if (gapi.client.getToken() === null) {
			// Prompt the user to select a Google Account and ask for consent to share their data
			// when establishing a new session.
			tokenClient.requestAccessToken({ prompt: 'consent' });
		} else {
			// Skip display of account chooser and consent dialog for an existing session.
			tokenClient.requestAccessToken({ prompt: '' });
		}
	}

	/**
	 *  Sign out the user upon button click.
	 */
	 export function handleSignoutClick() {
		const token = gapi.client.getToken();
		if (token !== null) {
			google.accounts.oauth2.revoke(token.access_token);
			gapi.client.setToken('');
			sigIn = false;
		}
	}

	/**
	 * Print the summary and start datetime/date of the next ten events in
	 * the authorized user's calendar. If no events are found an
	 * appropriate message is printed.
	 */
	export let allEvents: string[] = [];
	
	export async function listUpcomingEvents() {
		let response;
		try {
			const request = {
				calendarId: 'primary',
				timeMin: new Date().toISOString(),
				showDeleted: false,
				singleEvents: true,
				maxResults: 10,
				orderBy: 'startTime'
			};
			response = await gapi.client.calendar.events.list(request);
		} catch (err) {
			console.log(err);
			return;
		}

		const events = response.result.items;

		if (!events || events.length == 0) {
			//'No events found.'
			return;
		}

		
		// Flatten to string to display
		const task = events.reduce(
			(str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
			'Events:\n'
		);
		allEvents.push(events)
		console.log(allEvents);
	}
</script>

{#if gapiInited && gisInited }
	{#if !sigIn}
		<div class="avatar">
			<div class="w-10 rounded-xl">
				<img
				class="cursor-pointer"
					src="https://avatars0.githubusercontent.com/u/1342004?v=3&s=96"
					on:click={handleAuthClick}
				/>
			</div>
		</div>
	{:else if sigIn}
		<div class="avatar">
			<div class="w-10 rounded-xl">
				<img
					class="cursor-pointer"
					src="https://avatars0.githubusercontent.com/u/1342004?v=3&s=96"
					on:click={handleAuthClick}
				/>
			</div>
		</div>
		<div class="avatar">
			<div class="w-10 rounded-xl mx-10">
				<button class="text-red-500 font-bold rounded-lg" on:click={() => handleSignoutClick()}>SALIR</button>
			</div>
		</div>
	{/if}
{/if}