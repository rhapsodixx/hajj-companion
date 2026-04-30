<script lang="ts">
	interface Props {
		number: string;
		label?: string;
		class?: string;
	}

	let { number, label, class: className = '' }: Props = $props();

	const href = $derived(`tel:${number.replace(/\s/g, '')}`);
</script>

<a
	{href}
	class="tap-target inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-transform duration-100 ease-out active:scale-[0.98] {className}"
	aria-label="Telepon {label ?? number}"
>
	<!-- Phone icon -->
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path
			d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
		/>
	</svg>
	<span>{label ?? number}</span>
</a>
