<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		visible = true;
	});
	// ORIGINAL SINE WAVE CREDIT: Nick McMillan, https://codepen.io/hey-nick/pen/KVWvJv

	let lines = 10;
	function sine(node, lines = 10) {
		let numberOfLines = lines;
		const randomRange = (min, max) => {
			return ~~(Math.random() * (max - min + 1)) + min;
		};

		const lineDataArr = [];
		let requestAnimationID;

		const createPathString = () => {
			let completedPath = '';
			const ampl = 50; // pixel range from 0, aka how deeply they bend

			for (let i = 0; i < numberOfLines; i++) {
				const path = lineDataArr[i];

				const current = {
					x: ampl * Math.sin(path.counter / path.sin),
					y: ampl * Math.cos(path.counter / path.cos)
				};

				const startPoint = `M${path.startX},${path.startY}`;
				const quadraticControlPoint = `Q${path.pointX},${(current.y * 1.5).toFixed(3)}`;
				const centerPointIntersection = `${(current.x / 10 + path.centerX).toFixed(3)},${(
					current.y / 5 +
					path.centerY
				).toFixed(3)}`;
				const endPoint = `T${path.endX},${path.endY}`;
				const newPathSection = `${startPoint} ${quadraticControlPoint} ${centerPointIntersection} ${endPoint}`;

				path.counter++;

				completedPath += newPathSection;
			}

			return completedPath;
		};

		const createLines = () => {
			let newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			newPathEl.setAttribute('stroke', 'url(#gradient)');
			newPathEl.setAttribute('id', 'fusion-path');

			// higher is slower
			const minSpeed = 85;
			const maxSpeed = 350;

			// create an arr which contains objects for all lines
			// createPathString() will use this array

			for (let i = 0; i < numberOfLines; i++) {
				const lineDataObj = {
					counter: randomRange(1, 500), // a broad counter range ensures lines start at different cycles (will look more random)
					startX: randomRange(-5, -40),
					startY: randomRange(-5, -30),
					endX: randomRange(200, 220), // viewbox = 200
					endY: randomRange(120, 140), // viewbox = 120
					sin: randomRange(minSpeed, maxSpeed),
					cos: randomRange(minSpeed, maxSpeed),
					pointX: randomRange(30, 55),
					centerX: randomRange(90, 120),
					centerY: randomRange(60, 70)
				};

				lineDataArr.push(lineDataObj);
			}

			const animLoop = () => {
				newPathEl.setAttribute('d', createPathString());
				requestAnimationID = requestAnimationFrame(animLoop);
			};

			// once the path elements are created, start the animation loop
			node.appendChild(newPathEl);
			animLoop();
		};

		createLines();

		return {
			update: (lines) => {
				numberOfLines = lines;

				if (node.childElementCount > 1) {
					let childRef = document.getElementById('fusion-path');
					node.removeChild(childRef);
				}
				createLines();
			},
			destroy: () => {
				cancelAnimationFrame(requestAnimationID);
			}
		};
	}
</script>

{#if visible}
	<div class="wrapper" on:click={() => (lines = lines + 10)} in:fade>
		<svg
			use:sine={lines}
			class="animated-lines"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 200 120"
		>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" stop-color="var(--svelte-orange)" />
				<stop offset="50%" stop-color="#ff3e0210" />
				<stop offset="50%" stop-color="#d82d6010" />
				<stop offset="100%" stop-color="var(--rxjs-purple)" />
			</linearGradient>
		</svg>
	</div>
{/if}

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	.animated-lines {
		height: 100%;
		width: 100%;
	}
	.animated-lines :global(path) {
		fill: none;
		stroke-width: 0.5px;
		vector-effect: non-scaling-stroke;
	}
</style>
