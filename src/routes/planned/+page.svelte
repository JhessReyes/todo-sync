<!-- <svelte:head>
	<script src="https://apis.google.com/js/api.js" on:load={initializeGapi}></script>
	<script src="https://accounts.google.com/gsi/client" on:load={initializeGapi}></script>
    
    
    <script lang="ts">
        const CLIENT_ID = '658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com';
	const API_KEY = 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4';
	const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
	const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

	let gapiInited = false;
	let gisInited = false;

	const start = async () => {
		// Initializes the client with the API key and the Translate API.
		// @ts-ignore
		gapi.client
        .init({
            apiKey: API_KEY,
				discoveryDocs: [SCOPES]
			})
			.then(function () {
                gapiInited = true;
			})
			.then(
                function (response: any) {
                    console.log(response.result.data.translations[0].translatedText);
				},
				function (reason) {
                    console.log('Error: ' + reason);
				}
                );
	};
    
	const initializeGapi = async () => {
		gapi.load('client', start);
	};
    
	const gisLoaded = async () => {
        google.accounts.oauth2
        .initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
				callback: '' // defined later
			})
			.then(function () {
                gisInited = true;
			})
			.then(
                function (response: any) {
                    console.log(response.result.data.translations[0].translatedText);
				},
				function (reason: any) {
                    console.log('Error: ' + reason);
				}
                );
            };
        </script>
    </svelte:head> -->
<svelte:head>
	<script lang="ts">
		import { onMount, onDestroy } from 'svelte';
		const { google } = require('googleapis');
		const CLIENT_ID = '658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com';
		const API_KEY = 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4';
		const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
		const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

		let tokenClient: any;
		let gapiInited = false;
		let gisInited = false;

		onMount(async () => {
			// Load gapi and gis
			await Promise.all([
				new Promise((resolve: any) => {
					(window as any).gapiLoaded = resolve;
					const script = document.createElement('script');
					script.src = 'https://apis.google.com/js/api.js';
					script.async = true;
					script.defer = true;
					document.head.appendChild(script);
				}),
				new Promise((resolve: any) => {
					(window as any).gisLoaded = resolve;
					const script = document.createElement('script');
					script.src = 'https://apis.google.com/js/platform.js';
					script.async = true;
					script.defer = true;
					document.head.appendChild(script);
				})
			]);

			gapiInited = true;
			tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
				client_id: CLIENT_ID,
				scope: SCOPES,
				callback: async (resp: any) => {
					if (resp.error !== undefined) {
						throw resp;
					}
					await listUpcomingEvents();
				}
			});

			gisInited = true;

			if (gapiInited && gisInited) {
				// Initialize gapi client
				await (window as any).gapi.client.init({
					apiKey: API_KEY,
					discoveryDocs: [DISCOVERY_DOC]
				});
			}
		});
		async function handleAuthClick() {
			tokenClient.callback = async (resp: any) => {
				if (resp.error !== undefined) {
					throw resp;
				}
				await listUpcomingEvents();
			};

			if ((window as any).gapi.client.getToken() === null) {
				// Prompt the user to select a Google Account and ask for consent to share their data
				// when establishing a new session.
				tokenClient.requestAccessToken({ prompt: 'consent' });
			} else {
				// Skip display of account chooser and consent dialog for an existing session.
				tokenClient.requestAccessToken({ prompt: '' });
			}
		}/* 
		const listEvents = async (): Promise<void> => {
			try {
				const scopes = [
					'https://www.googleapis.com/auth/blogger',
					'https://www.googleapis.com/auth/calendar'
				];

				const oauth2Client = await new google.auth.OAuth2(
					'658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com',
					'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',
					'http://localhost:5173'
				);

				const url = await oauth2Client.generateAuthUrl({
					// 'online' (default) or 'offline' (gets refresh_token)
					access_type: 'offline',

					// If you only need one scope you can pass it as a string
					scope: scopes
				});
				console.log(url);
			} catch (error) {
				console.log(error);
			}
		};
		onDestroy(() => {
			google = null;
		});
		const calendar = google.calendar({
			auth: 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4'
		});

		const listEvents = async (): Promise<void> => {
			try {
				const request = {
					calendarId: 'primary',
					timeMin: new Date().toISOString(),
					showDeleted: false,
					singleEvents: true,
					maxResults: 10,
					orderBy: 'startTime'
				};
				let response = await calendar.events.list(request);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}; */
	</script>
</svelte:head>

<body>
	<span>sgsdfsa</span>
</body>
<button id="authorize_button" style="visibility:hidden" on:click={() => start}>Authorize</button>
<h1>Welcome to planned section</h1>
<button class="btn bg-primary text-white">PLANEADO</button>
