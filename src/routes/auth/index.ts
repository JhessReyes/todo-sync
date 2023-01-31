import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
/**
 * 'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/calendar.readonly',
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events',
	'https://www.googleapis.com/auth/calendar.events.readonly'
 */
const SCOPES = [
	'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly'
];

export let tokenClient = '';
export let tokenWeb = '';
export let gapiInited = false;
export let gisInited = false;
export let ready = false;
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
		scope: SCOPES[0],
		callback: '' // defined later
	});
	gisInited = true;
	maybeEnableButtons();
}

export function maybeEnableButtons() {
	if (gapiInited && gisInited) {
		ready = true;
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
		tokenWeb = gapi.client.getToken().access_token;
		userLoggedIn(tokenWeb);
		sessionStore('accessToken', tokenWeb);
		localStore('gClient', gapi);
		await listUpcomingEvents();
		setTimeout(() => {
			goto('/');
		}, 500);
	};
	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({ prompt: 'consent' });
	} else {
		tokenWeb = gapi.client.getToken().access_token;
		console.log(tokenWeb);
	}
}

export function checkLogged() {
	let logged = false;

	if (gapi.client.getToken() === null) {
		sigIn = false;
	} else {
		sigIn = true;
	}

	logged = sigIn;

	return logged;
}

export function verifyToken(token: string) {
	gapi.client.setToken(token);
	console.log(gapi.client);
}

/**
 *  Sign out the user upon button click.
 */
export async function handleSignoutClick() {
	const token = gapi.client.getToken();
	if (browser) {
		let accessToken = browser ? window.sessionStorage.getItem('accessToken') : '';
		if (accessToken !== null) {
			google.accounts.oauth2.revoke(accessToken);
			gapi.client.setToken('');
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('givenName');
			sessionStorage.removeItem('accessToken');
			sessionStorage.removeItem('picture');

			setTimeout(() => {
				goto('/auth');
			}, 500);
			sigIn = false;
		}
	}
}

export async function userLoggedIn(access_token: string) {
	try {
		fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + access_token)
			.then((response) => response.json())
			.then((data) => {
				sessionStore('userId', data.id);
				sessionStore('name', data.name);
				sessionStore('givenName', data.given_name);
				sessionStore('picture', data.picture);
			});
	} catch (error) {
		console.log(error);
	}
}

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
	console.log(allEvents);
}

function sessionStore(field: string, value: string) {
	if (browser) window.sessionStorage.setItem(field, value);
}

function localStore(field: string, value) {
	if (browser) window.sessionStorage.setItem(field, value);
}

export default {
	gapiLoaded,
	gisLoaded,
	maybeEnableButtons,
	gapiInited,
	gisInited,
	sigIn,
	checkLogged,
	tokenWeb,
	userLoggedIn,
	handleSignoutClick,
	verifyToken
};
