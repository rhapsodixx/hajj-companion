<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { Compass, CalendarBlank, BookOpenText, List } from 'phosphor-svelte';

	const nav = [
		{
			href: '/',
			label: 'Sekarang',
			match: (p: string) => p === '/',
			icon: Compass,
			color: 'var(--color-pastel-green)'
		},
		{
			href: '/itinerary',
			label: 'Jadwal',
			match: (p: string) => p.startsWith('/itinerary'),
			icon: CalendarBlank,
			color: 'var(--color-pastel-blue)'
		},
		{
			href: '/dua',
			label: "Du'a",
			match: (p: string) => p.startsWith('/dua'),
			icon: BookOpenText,
			color: 'var(--color-pastel-yellow)'
		},
		{
			href: '/more',
			label: 'Lainnya',
			match: (p: string) => p.startsWith('/more'),
			icon: List,
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
			{@const IconComponent = item.icon}
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
				<div class="relative transition-transform duration-300 {active ? '-translate-y-1' : ''}">
					<IconComponent size={24} weight="regular" />
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
