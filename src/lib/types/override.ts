export type DailyOverride = {
	id: string;
	dayNumber: number;
	bus: 'B-18' | 'B-19' | 'B-20' | 'B-21' | 'all';
	field: 'departureTime' | 'note';
	value: string;
	publishedAt: string;
	publishedBy: string;
};
