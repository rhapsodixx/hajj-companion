<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		phase?: string;
		children: Snippet;
		label?: Snippet;
		class?: string;
	}

	let { phase: _phase, children, label, class: className = '' }: Props = $props();
</script>

<div
	class="card-enter relative overflow-hidden rounded-xl bg-foreground p-5 text-surface shadow-level-1 {className}"
>
	<div class="relative z-10">
		{#if label}
			<div class="mb-2">
				{@render label()}
			</div>
		{/if}
		{@render children()}
	</div>
</div>
