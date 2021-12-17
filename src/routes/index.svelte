<script>
	import SineWave from '../components/SineWave.svelte';
	import HeaderLogoBox from '../components/HeaderLogoBox.svelte';
</script>
<svelte:head>
	<title>svelte-fuse-rx</title>
</svelte:head>

<header>
	<h1><span>SVELTE</span><span class="fuse">FUSE:</span><span class="rx">RX</span></h1>
	<p class="subtitle">simple actions | pipeable stores</p>
	<p class="phrase">Go ahead, cross the streams.</p>
	<HeaderLogoBox />
	<SineWave />
</header>
<main>
	<h2>What is this?</h2>
	<p>
		<code>svelte-fuse-rx</code> is a package for enhancing Svelte stores and event handling with RxJS.
	</p>
	<p>Try it in your own Svelte project with <code>npm i svelte-fuse-rx --save-dev</code> or take a closer look on the docs page.</p>

	<h2>Why would I use it?</h2>
	<ol>
		<li>
			An <code>rxWritable</code> store that can use all of Svelte sytax like auto-subscribe,
			value-binding, and direct assignement <span class="italic">AND</span> implement the RxJS pipe
			to use any RxJS operators. Regular Svelte stores cannot do the latter, and regular RxJS
			"stores" (e.g. BehaviorSubject) cannot do the former.<span class="asterisk">*</span>
		</li>
		<li>
			Svelte actions to abstract common RxJS patterns. You don't need to know or learn RxJS to use
			them. (but you should, because it's fun and uniquely helpful)
		</li>
	</ol>
	<p class="footnote">
		<span class="asterisk">*</span>RxJS observables can (conveniently) use Svelte auto-subscribe out
		of the box.
	</p>

	<h2>Do I really need "all of RxJS" just for my small use case?</h2>
	<p>
		No, and you don't get "all of RxJS" in your production bundle if you only import the things you
		need. The rest is tree-shaken away.
	</p>
</main>

<style>
	header {
		position: relative;
		width: 100%;
		min-height: 70vh;
		padding: calc(1rem + 60px) 60px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #676779;
		background: radial-gradient(
				34.14% 72.25% at 47.58% 31.75%,
				rgba(232, 244, 255, 0.52) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			linear-gradient(
				92.4deg,
				#d1d4d7 14.67%,
				rgba(238, 247, 255, 0.48) 54.37%,
				rgba(206, 216, 224, 0.62) 92.49%
			),
			linear-gradient(0deg, #dbe7ef, #dbe7ef);
			overflow: hidden;
	}

	h1 {
		font-size: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 0;
	}

	h1 .fuse {
		color: #7d838d;
	}
	h1 .rx {
		color: var(--rxjs-purple);
	}

	.subtitle {
		font-size: 0.85rem;
		color: #7d838d;
	}

	ol li {
		margin: 1rem 0;
	}

	/* .watermark {
		opacity: 0.25;
	}

	.watermark.svelte {
		width: 40px;
		vertical-align: top;
	}
	.watermark.rxjs {
		width: 40px;
		vertical-align: bottom;
	}

	.img-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 200px;
		height: 90px;
	} */
</style>
