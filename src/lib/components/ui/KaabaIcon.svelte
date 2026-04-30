<script lang="ts">
	let { size = '1em' as string | number, weight = 'regular', class: className = '' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={weight === 'fill' ? 'currentColor' : 'none'}
	stroke={weight === 'fill' ? 'none' : 'currentColor'}
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
>
	{#if weight === 'fill'}
		<rect x="3" y="4" width="18" height="18" rx="1" />
		<!-- Highlight band cutout for fill mode -->
		<rect x="3" y="9" width="18" height="3" fill="#fff" opacity="0.3" />
	{:else}
		<rect x="3" y="4" width="18" height="18" rx="1" />
		<!-- Kiswah Gold Band -->
		<line x1="3" y1="9" x2="21" y2="9" />
		<line x1="3" y1="12" x2="21" y2="12" />
		<!-- Kaaba Door -->
		<path d="M14 22L14 16A1 1 0 0 1 15 15L17 15A1 1 0 0 1 18 16L18 22" />
	{/if}
</svg>
