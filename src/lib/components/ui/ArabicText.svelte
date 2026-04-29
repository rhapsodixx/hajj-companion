<script lang="ts">
	type Size = 'base' | 'lg' | 'xl';

	interface Props {
		text: string;
		size?: Size;
		class?: string;
	}

	let { text, size = 'base', class: className = '' }: Props = $props();

	const sizeClass: Record<Size, string> = {
		base: 'arabic',
		lg: 'arabic-lg',
		xl: 'arabic-xl'
	};
</script>

<p class="{sizeClass[size]} {className}" lang="ar" dir="rtl">
	{text}
</p>
