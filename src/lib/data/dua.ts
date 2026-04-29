import type { Dua, DuaLibrary } from '$lib/types/dua';
import raw from './dua.json';

export const duaLibrary: DuaLibrary = raw as Dua[];

export function getDua(id: string): Dua | undefined {
	return duaLibrary.find((d) => d.id === id);
}

export function getDuaByIds(ids: string[]): Dua[] {
	return ids.map((id) => duaLibrary.find((d) => d.id === id)).filter((d): d is Dua => !!d);
}

export function getDuaByCategory(category: Dua['category']): Dua[] {
	return duaLibrary.filter((d) => d.category === category);
}
