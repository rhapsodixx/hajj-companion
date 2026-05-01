<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let el: HTMLElement | undefined = $state();

	onMount(() => {
		if (!el) return;
		const shapes = el.querySelectorAll('.gsap-shape');
		const tweens = Array.from(shapes).map((shape, i) =>
			gsap.to(shape, {
				y: 'random(-20, 20)',
				x: 'random(-20, 20)',
				rotation: 'random(-15, 15)',
				duration: 'random(3, 6)',
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: i * 0.5
			})
		);
		return () => tweens.forEach((t) => t.kill());
	});
</script>

<div bind:this={el} class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background">
	<div class="app-bg absolute inset-0 opacity-[0.03]"></div>
	<div
		class="gsap-shape absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-(--color-pastel-green) opacity-40 mix-blend-multiply blur-3xl"
	></div>
	<div
		class="gsap-shape absolute top-[20%] right-[-10%] h-80 w-80 rounded-full bg-(--color-pastel-blue) opacity-30 mix-blend-multiply blur-3xl"
	></div>
	<div
		class="gsap-shape absolute bottom-[10%] left-[20%] h-[30rem] w-[30rem] rounded-full bg-(--color-pastel-yellow) opacity-30 mix-blend-multiply blur-3xl"
	></div>
</div>
