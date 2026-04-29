export type ClimateNorm = {
	id: string;
	city: string;
	month: string; // "May" | "June"
	tempMinC: number;
	tempMaxC: number;
	humidity: number; // percentage
	advice: string; // Bahasa Indonesia
};

export type ClimateLibrary = ClimateNorm[];
