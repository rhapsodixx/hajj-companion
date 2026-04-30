import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'prompt', // prompt user to update, not auto-reload mid-prayer
			srcDir: 'src',
			filename: 'service-worker.ts',
			strategies: 'injectManifest',
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
				globIgnores: ['**/*.pdf', 'server/**']
			},
			manifest: {
				name: 'quwa',
				short_name: 'quwa',
				description:
					'Panduan ibadah haji Patuna Coklat B — jadwal, doa, dan bimbingan ritual untuk jamaah 2026.',
				theme_color: '#000000',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				lang: 'id',
				categories: ['lifestyle', 'utilities'],
				icons: [
					{
						src: '/favicon.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/favicon.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/favicon.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			devOptions: {
				enabled: false,
				type: 'module'
			}
		})
	],
	ssr: {
		noExternal: ['phosphor-svelte']
	}
});
