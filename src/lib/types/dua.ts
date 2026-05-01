export type Dua = {
	id: string;
	title: string; // Bahasa Indonesia
	arabic: string;
	latin: string;
	translation: string; // Bahasa Indonesia
	whenToRead: string; // konteks kapan dibaca
	category: 'niat' | 'tawaf' | 'sai' | 'wukuf' | 'jumrah' | 'safar' | 'masjid' | 'umum' | 'dzikir';
	sources: string; // Referensi sumber doa
};

export type DuaLibrary = Dua[];
