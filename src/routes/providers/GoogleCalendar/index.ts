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

export default { getEventsPlanned };
