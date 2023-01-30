<script lang="ts">
	export let allEvents: string[] = [];

	async function listUpcomingEvents() {
		allEvents = [];
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
			/* console.log(err); */
			return;
		}

		const events = response.result.items;

		if (!events || events.length == 0) {
			/* 'No events found.' */
			return;
		}

		allEvents.push(events);
		console.log(allEvents);
	}
</script>

<body>
	<span>sgsdfsa</span>
</body>
<!-- <button id="authorize_button" style="visibility:hidden" on:click={}>Authorize</button> -->
<h1>Welcome to planned section</h1>
<button class="btn bg-primary text-white" on:click={listUpcomingEvents}>PLANEADO</button>
