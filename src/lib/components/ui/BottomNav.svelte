<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	const nav = [
		{
			href: '/',
			label: 'Sekarang',
			match: (p: string) => p === '/',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
			color: 'var(--color-pastel-green)'
		},
		{
			href: '/itinerary',
			label: 'Jadwal',
			match: (p: string) => p.startsWith('/itinerary'),
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
			color: 'var(--color-pastel-blue)'
		},
		{
			href: '/dua',
			label: "Du'a",
			match: (p: string) => p.startsWith('/dua'),
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
			color: 'var(--color-pastel-yellow)'
		},
		{
			href: '/more',
			label: 'Lainnya',
			match: (p: string) => p.startsWith('/more'),
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
			color: 'var(--color-brand-light)'
		}
	];

	const currentPath = $derived(page.url.pathname);
	let navContainer: HTMLElement;

	function setupTapAnimation(node: HTMLElement) {
		const handlePointerDown = () => {
			gsap.to(node, { scale: 0.85, y: 4, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
		};
		const handlePointerUp = () => {
			gsap.to(node, { scale: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
		};

		node.addEventListener('pointerdown', handlePointerDown);
		node.addEventListener('pointerup', handlePointerUp);
		node.addEventListener('pointercancel', handlePointerUp);
		node.addEventListener('pointerleave', handlePointerUp);

		return {
			destroy() {
				node.removeEventListener('pointerdown', handlePointerDown);
				node.removeEventListener('pointerup', handlePointerUp);
				node.removeEventListener('pointercancel', handlePointerUp);
				node.removeEventListener('pointerleave', handlePointerUp);
			}
		};
	}

	function animateIndicator(node: HTMLElement) {
		gsap.fromTo(
			node,
			{ scale: 0, opacity: 0, rotation: -15, y: 10 },
			{ scale: 1, opacity: 1, rotation: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
		);
	}

	onMount(() => {
		gsap.fromTo(
			navContainer,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.2 }
		);
	});
</script>

<nav
	bind:this={navContainer}
	class="fixed right-0 bottom-6 left-0 z-40 mx-auto max-w-[90%] rounded-2xl border border-border/50 bg-surface/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:max-w-120"
	style="padding-bottom: env(safe-area-inset-bottom, 0px)"
	aria-label="Navigasi utama"
>
	<div class="relative flex items-center justify-around px-2 py-2">
		{#each nav as item}
			{@const active = item.match(currentPath)}
			<a
				href={item.href}
				use:setupTapAnimation
				class="tap-target relative z-10 flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors duration-300"
				class:text-foreground={active}
				class:text-muted={!active}
				aria-current={active ? 'page' : undefined}
			>
				{#if active}
					<div
						use:animateIndicator
						class="absolute inset-0 z-[-1] rounded-xl opacity-40"
						style="background-color: {item.color}; transform-origin: center bottom;"
					></div>
				{/if}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="relative transition-transform duration-300 {active ? '-translate-y-1' : ''}">
					{@html item.icon}
				</div>
				<span
					class="relative font-bold transition-all duration-300 {active
						? '-translate-y-0.5 scale-100 opacity-100'
						: 'scale-95 opacity-70'}">{item.label}</span
				>
			</a>
		{/each}
	</div>
</nav>
