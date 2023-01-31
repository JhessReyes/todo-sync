//REQUEST TO GET EVENT PLANNED
export async function getEventsPlanned(access_token: string) {
	let d = new Date();
	try {
		const res = gapi.client.request({
			path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
			method: 'GET',
			params: {
				timeMin: new Date(d.getFullYear(), d.getMonth(), 1).toISOString(),
				showDeleted: false,
				singleEvents: true,
				maxResults: 10,
				orderBy: 'startTime'
			},
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		});
		return res;
	} catch (error) {
		return error;
	}
}

//REQUEST TO GET EVENT FINISHED
export async function getEventsFinished(access_token: string) {
	let d = new Date();
	try {
		const res = gapi.client.request({
			path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
			method: 'GET',
			params: {
				timeMin: new Date(d.getFullYear(), d.getMonth(), 1).toISOString(),
				timeMax: new Date().toISOString(),
				showDeleted: true,
				singleEvents: true,
				maxResults: 10,
				orderBy: 'startTime'
			},
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		});
		return res;
	} catch (error) {
		return error;
	}
}

//POST EVENT
export async function createEvent(
	access_token: string,
	summary: string,
	end: string,
	start: string
) {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	let endDateTime = new Date(end).toISOString();
	let startDateTime = new Date(start).toISOString();
	try {
		const event = {
			summary: summary,
			end: {
				dateTime: endDateTime,
				timeZone: timezone
			},
			start: {
				dateTime: startDateTime,
				timeZone: timezone
			},
			reminders: {
				useDefault: false,
				overrides: [
					{ method: 'email', minutes: 24 * 60 },
					{ method: 'popup', minutes: 10 }
				]
			}
		};

		const res = gapi.client.request({
			path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
			method: 'POST',
			params: {
				calendarId: 'primary',
				sendNotifications: true
			},
			body: event,
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		});
		return res;
	} catch (error) {
		return error;
	}
}

export default { getEventsPlanned, getEventsFinished, createEvent };
