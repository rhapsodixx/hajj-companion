<script lang="ts">
	interface Props {
		value: string;
		onInput: (e: Event) => void;
		onClear: () => void;
	}

	let { value, onInput, onClear }: Props = $props();
</script>

<div class="relative mt-3">
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
		aria-hidden="true"
	>
		<circle cx="11" cy="11" r="8" />
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
	<input
		type="text"
		{value}
		oninput={onInput}
		placeholder="Cari doa..."
		class="w-full rounded-lg border border-border bg-surface py-2.5 pr-9 pl-9 text-sm text-foreground placeholder:text-muted/60 focus:border-(--color-brand) focus:outline-none"
		aria-label="Cari doa"
	/>
	{#if value}
		<button
			onclick={onClear}
			class="tap-target absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted"
			aria-label="Hapus pencarian"
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	{/if}
</div>
