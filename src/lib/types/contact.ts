export type Contact = {
	id: string;
	name: string;
	role: string;
	phone?: string; // E.164 or local format
	whatsapp?: string; // E.164 without +
	address?: string; // Latin
	addressArabic?: string; // Arabic — for showing taxi drivers
	note?: string;
	category: 'muthawwif' | 'patuna' | 'hotel' | 'emergency' | 'consulate';
};

export type ContactList = Contact[];
