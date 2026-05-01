import type { Contact, ContactList } from '$lib/types/contact';
import raw from './contacts.json';
import { env } from '$env/dynamic/public';

export const contacts: ContactList = (raw as Contact[]).map((contact) => {
	const c = { ...contact };
	if (c.phone === 'ENV_ADE_PHONE') c.phone = env.PUBLIC_PHONE_ADE_IRFAN || undefined;
	if (c.whatsapp === 'ENV_ADE_WHATSAPP') c.whatsapp = env.PUBLIC_WHATSAPP_ADE_IRFAN || undefined;
	if (c.phone === 'ENV_NESYA_PHONE') c.phone = env.PUBLIC_PHONE_NESYA || undefined;
	if (c.whatsapp === 'ENV_NESYA_WHATSAPP') c.whatsapp = env.PUBLIC_WHATSAPP_NESYA || undefined;
	if (c.phone === 'ENV_NANI_PHONE') c.phone = env.PUBLIC_PHONE_NANI || undefined;
	if (c.whatsapp === 'ENV_NANI_WHATSAPP') c.whatsapp = env.PUBLIC_WHATSAPP_NANI || undefined;
	return c;
});

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
