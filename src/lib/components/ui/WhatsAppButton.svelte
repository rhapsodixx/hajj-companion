<script lang="ts">
	import { WhatsappLogo } from 'phosphor-svelte';
	interface Props {
		number: string;
		message?: string;
		label?: string;
		class?: string;
	}

	let { number, message = '', label, class: className = '' }: Props = $props();

	const clean = $derived(number.replace(/[\s+\-()]/g, ''));
	const href = $derived(
		`https://wa.me/${clean}${message ? `?text=${encodeURIComponent(message)}` : ''}`
	);
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="tap-target inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-4 text-sm font-medium text-[#000000] transition-transform duration-100 ease-out active:scale-[0.98] {className}"
	aria-label="WhatsApp {label ?? number}"
>
	<!-- WhatsApp icon -->
	<WhatsappLogo size={16} weight="fill" />
	<span>{label ?? number}</span>
</a>
