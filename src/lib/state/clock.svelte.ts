import { browser } from '$app/environment';
import { SvelteDate } from 'svelte/reactivity';
import itinerary from '$lib/data/itinerary.json';

export class AppClock {
	currentDay = $state(1);
	currentPhase = $state('arrival');
	isAfterMaghrib = $state(false);

	constructor() {
		if (browser) {
			this.update();
			// Update every minute to check if day/maghrib changed
			setInterval(() => this.update(), 60000);
		} else {
			// SSR fallback
			this.currentDay = 1;
			this.currentPhase = 'arrival';
		}
	}

	update() {
		const overrideDayStr = localStorage.getItem('patuna-debug-day');
		const dateToUse = new SvelteDate();

		let dayObj;
		if (overrideDayStr) {
			const num = parseInt(overrideDayStr, 10);
			dayObj = itinerary.find((d) => d.dayNumber === num);
		}

		if (!dayObj) {
			// Get YYYY-MM-DD format for local timezone
			const localDate = new SvelteDate(dateToUse.getTime() - dateToUse.getTimezoneOffset() * 60000);
			const yyyymmdd = localDate.toISOString().split('T')[0];

			dayObj = itinerary.find((d) => d.gregorianDate === yyyymmdd);
		}

		// Fallback to day 1 if outside the entire window
		if (!dayObj) {
			dayObj = itinerary.find((d) => d.dayNumber === 1);
		}

		if (dayObj) {
			this.currentDay = dayObj.dayNumber;
			this.currentPhase = dayObj.phase;
		}

		// Basic mock for maghrib (18:30)
		const minutesSinceMidnight = dateToUse.getHours() * 60 + dateToUse.getMinutes();
		const maghribMinutes = 18 * 60 + 30; // 18:30
		this.isAfterMaghrib = minutesSinceMidnight >= maghribMinutes;
	}

	setDebugDay(dayNumber: number | null) {
		if (dayNumber === null) {
			localStorage.removeItem('patuna-debug-day');
		} else {
			localStorage.setItem('patuna-debug-day', dayNumber.toString());
		}
		this.update();
	}
}

export const clock = new AppClock();
