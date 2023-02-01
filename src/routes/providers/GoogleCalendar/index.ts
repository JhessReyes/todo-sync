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
	/* 	let da = new Date(d - 24 * 60 * 60 * 1000).toISOString();
	console.log(da);
 */ try {
		const res = gapi.client.request({
			path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
			method: 'GET',
			params: {
				timeMin: new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()).toISOString(),
				timeMax: new Date(new Date() - 24 * 60 * 60 * 1000).toISOString(),
				showDeleted: false,
				singleEvents: true,
				maxResults: 100,
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

//DELETE EVENT
export async function deletEvent(access_token: string, id: string) {
	try {
		const res = gapi.client.request({
			path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events/' + id,
			method: 'DELETE',
			params: {
				sendUpdates: 'all',
				sendNotifications: true
			},
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		});
		console.log(res);
		return res;
	} catch (error) {
		return error;
	}
}

export default { getEventsPlanned, getEventsFinished, createEvent, deletEvent };
