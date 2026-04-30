<script lang="ts">
	import { page } from '$app/state';

	const nav = [
		{
			href: '/',
			label: 'Sekarang',
			match: (p: string) => p === '/',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
		},
		{
			href: '/itinerary',
			label: 'Jadwal',
			match: (p: string) => p.startsWith('/itinerary'),
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
		},
		{
			href: '/dua',
			label: "Du'a",
			match: (p: string) => p.startsWith('/dua'),
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
		},
		{
			href: '/more',
			label: 'Lainnya',
			match: (p: string) => p.startsWith('/more'),
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
		}
	];

	const currentPath = $derived(page.url.pathname);
</script>

<nav
	class="fixed right-0 bottom-0 left-0 z-40 bg-white/80 shadow-[0_-1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md"
	style="padding-bottom: env(safe-area-inset-bottom, 0px)"
	aria-label="Navigasi utama"
>
	<div class="mx-auto flex max-w-120">
		{#each nav as item}
			{@const active = item.match(currentPath)}
			<a
				href={item.href}
				class="tap-target flex flex-1 flex-col items-center gap-0.5 px-2 text-xs font-medium transition-colors duration-150"
				class:text-(--color-brand)={active}
				class:text-muted={!active}
				aria-current={active ? 'page' : undefined}
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html item.icon}
				<span>{item.label}</span>
				{#if active}
					<span class="mt-0.5 h-1 w-1 rounded-full bg-(--color-brand)"></span>
				{/if}
			</a>
		{/each}
	</div>
</nav>
