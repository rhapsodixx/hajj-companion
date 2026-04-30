<script lang="ts">
	import { CaretDown } from 'phosphor-svelte';
	import type { Dua } from '$lib/types/dua';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import gsap from 'gsap';

	interface Props {
		dua: Dua;
		expanded: boolean;
		onToggle: () => void;
		showCategory?: boolean;
		categoryLabel?: string;
	}

	let { dua, expanded, onToggle, showCategory = false, categoryLabel }: Props = $props();

	let contentWrapper = $state<HTMLElement | null>(null);
	let contentInner = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!contentWrapper || !contentInner) return;

		if (expanded) {
			// Expanded animation
			gsap.to(contentWrapper, {
				height: 'auto',
				duration: 0.4,
				ease: 'power3.out'
			});
			// Stagger in the contents
			gsap.fromTo(
				contentInner.children,
				{ y: 10, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
			);
		} else {
			// Collapsed animation
			gsap.to(contentWrapper, {
				height: 0,
				duration: 0.3,
				ease: 'power3.inOut'
			});
		}
	});
</script>

<Card
	class="group overflow-hidden transition-all duration-300 {expanded
		? 'border-brand/30 shadow-md shadow-brand/5'
		: ''}"
>
	<button
		class="tap-target min-h-[44px] w-full text-left"
		onclick={onToggle}
		aria-expanded={expanded}
	>
		<div class="flex w-full items-center justify-between">
			<div class="flex-1 pr-4">
				<p
					class="text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
				>
					{dua.title}
				</p>
				{#if showCategory && categoryLabel}
					<p class="mt-1 text-[10px] font-bold tracking-widest text-brand uppercase">
						{categoryLabel}
					</p>
				{/if}
				<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
					{dua.whenToRead}
				</p>
			</div>
			<CaretDown
				size={20}
				weight="bold"
				class="shrink-0 text-muted/30 transition-all duration-300 group-hover:text-brand {expanded
					? 'rotate-180 text-brand'
					: ''}"
				aria-hidden="true"
			/>
		</div>
	</button>

	<!-- GSAP Animated Collapsible Content -->
	<div bind:this={contentWrapper} class="h-0 overflow-hidden">
		<div bind:this={contentInner} class="mt-4 space-y-4 border-t border-border/50 pt-4 pb-2">
			<ArabicText text={dua.arabic} size="lg" />
			<p class="text-xs leading-relaxed text-muted italic">{dua.latin}</p>
			<p class="text-sm leading-relaxed text-foreground">{dua.translation}</p>
		</div>
	</div>
</Card>
