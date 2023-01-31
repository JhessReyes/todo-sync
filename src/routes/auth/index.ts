import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '658523415599-q4q5ote7qp7vpfoj5ft0278uj2dk5bpt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBdZ_MbayckF0Gzy2uuHKBMpVuXMoSTrB4';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = [
	'https://www.googleapis.com/auth/calendar.readonly',
	'https://www.googleapis.com/auth/userinfo.profile'
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
		scope: SCOPES[1],
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
		console.log(gapi.client);
		tokenWeb = gapi.client.getToken().access_token;
		userLoggedIn(tokenWeb);
		sessionStore('accessToken', tokenWeb);
		/* 		await listUpcomingEvents();*/
		/* await userLoggedIn(); */
		/* invalidate((url) => url.pathname === '/path');
		 */
		setTimeout(() => {
			goto('/');
		}, 500);
	};
	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({ prompt: 'consent' });
	} else {
		sigIn = true;
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.requestAccessToken({ prompt: '' });
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

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick() {
	const token = gapi.client.getToken();
	if (token !== null) {
		google.accounts.oauth2.revoke(token.access_token);
		gapi.client.setToken('');
		if (browser) {
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('givenName');
			sessionStorage.removeItem('accessToken');
			sessionStorage.removeItem('picture');
		}
		setTimeout(() => {
			goto('/auth');
		}, 500);
		sigIn = false;
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

function sessionStore(field: string, value: string) {
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
	handleSignoutClick
};
