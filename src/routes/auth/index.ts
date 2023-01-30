import { browser } from '$app/environment';

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
		tokenWeb = gapi.client.getToken();
		sessionStore('googleToken', gapi.client.getToken().access_token);
		/* 		await listUpcomingEvents();*/
		/* await userLoggedIn(); */
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

async function userLoggedIn(googleUser) {
	const profile = googleUser.getBasicProfile();

	console.log(profile);
	console.log('asdfs');
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
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
	tokenWeb
};
