<script>
	import { onMount } from 'svelte';
	import { draw, fade, fly, scale } from 'svelte/transition';
	import { quintOut, elasticIn, elasticInOut, elasticOut } from 'svelte/easing';
	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

{#if visible}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		data-svg-carbon-icon="Subflow32"
		fill="currentColor"
		viewBox="0 0 32 32"
		width="80"
    in:scale={{
      duration: 20000,
      opacity: 1,
      start: 25,
      easing: quintOut
    }}
><path
			d="M16 30A14.0158 14.0158 0 0 1 2 16h2a12.0025 12.0025 0 0 0 18.4609 10.1143l1.0782 1.684A13.9511 13.9511 0 0 1 16 30Z"
			fill="#ff3e02"
		/>
		<path
			
			style="transform-origin: center;"
			d="m26 17-1.4141 1.4141L26.1719 20H15.8157a2.9874 2.9874 0 0 0-.2742-.5762l4.481-5.601A2.9676 2.9676 0 0 0 21 14a3 3 0 1 0-2.8157-4h-4.3686a2.982 2.982 0 0 0-5.6314 0H2v2h6.1843a2.982 2.982 0 0 0 5.6314 0h4.3686a2.9874 2.9874 0 0 0 .2742.5762l-4.481 5.601A2.9676 2.9676 0 0 0 13 18a3 3 0 1 0 2.8157 4h10.3562l-1.586 1.5859L26 25l4-4Zm-5-7a1 1 0 1 1-1 1 1.0009 1.0009 0 0 1 1-1Zm-10 2a1 1 0 1 1 1-1 1.0009 1.0009 0 0 1-1 1Zm2 10a1 1 0 1 1 1-1 1.0009 1.0009 0 0 1-1 1Z"
			fill="#444444aa"
		/>
		<path
			d="M30 16h-2A12.0025 12.0025 0 0 0 9.5391 5.8857l-1.0782-1.684A14.0019 14.0019 0 0 1 30 16Z"
			fill="#d82d60"
		/></svg
	>
{/if}
<!-- in:fly={{ x: -20, y: 20, delay: 600, duration: 1500, easing: quintOut }} -->

<style>
	svg {
		display: inline-block;
    opacity: .25;
	}
</style>
