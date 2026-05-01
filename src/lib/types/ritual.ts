export type RitualStep = {
	title: string;
	instruction: string;
	note?: string;
	arabic?: string;
	latin?: string;
	translation?: string;
	arabicSource?: string;
	warning?: string;
};

export type RitualGuide = {
	id: string;
	title: string;
	subtitle: string;
	phase: string;
	overview: string;
	preparation: string[];
	steps: RitualStep[];
	closingNote?: string;
	duaIds: string[];
	dayNumbers: number[];
};
