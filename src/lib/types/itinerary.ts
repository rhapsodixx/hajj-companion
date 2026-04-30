export type Phase =
	| 'manasik'
	| 'arrival'
	| 'madinah'
	| 'madinah-to-makkah'
	| 'makkah'
	| 'ash-shishah'
	| 'rukun'
	| 'post-hajj'
	| 'departure';

export type Location =
	| 'Tangerang'
	| 'Jakarta'
	| 'Jeddah'
	| 'Madinah'
	| 'Makkah'
	| 'Ash Shishah'
	| 'Arafah'
	| 'Muzdalifah'
	| 'Mina'
	| 'in-transit';

export type Activity = {
	time?: string | null; // "HH:MM" — null = throughout the day
	title: string;
	description: string;
	location?: string;
	conditional?: boolean;
};

export type DressCode = {
	men: string;
	women: string;
};

export type Day = {
	dayNumber: number; // 1–26
	gregorianDate: string; // "2026-05-11"
	hijriDate: string; // "24 Zulqa'dah 1447"
	hijriDay: number;
	hijriMonth: string;
	hijriYear: number;
	phase: Phase;
	location: Location;
	routeLabel: string;
	activities: Activity[];
	whatToDo: string; // prose summary Bahasa Indonesia
	whatToBring: string[];
	dressCode?: DressCode;
	koperNote?: string;
	tips: string[];
	duaIds: string[];
	climateNormId: string;
	patunaNote?: string;
	ritualGuideId?: string; // only on the 7 critical days
};

export type Itinerary = Day[];
