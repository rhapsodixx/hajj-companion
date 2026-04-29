import type { Contact, ContactList } from '$lib/types/contact';
import raw from './contacts.json';

export const contacts: ContactList = raw as Contact[];

export function getContact(id: string): Contact | undefined {
	return contacts.find((c) => c.id === id);
}

export function getContactsByCategory(category: Contact['category']): Contact[] {
	return contacts.filter((c) => c.category === category);
}

export function getMuthawwif(): Contact[] {
	return getContactsByCategory('muthawwif');
}

export function getEmergencyContacts(): Contact[] {
	return [...getContactsByCategory('emergency'), ...getContactsByCategory('consulate')];
}
