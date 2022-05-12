<script>
	let vw;
</script>

<svelte:window bind:innerWidth={vw} />
<nav>
	<a href="/" class="logo-link" aria-label="Home" title="Home">
		<img src="/sineWave.svg" alt="rx-fuse logo" width="60" />
		{#if vw > 600}
			<div class="logo-text">
				<span class="svelte">SVELTE</span>
				<span class="fuse">FUSE:</span>
				<span class="rx">RX</span>
			</div>
		{/if}
	</a>
	<span class="flex-spacer" />
	<a aria-label="Docs" class="nav-link" href="/docs">Docs</a>
	<a
		title="GitHub"
		aria-label="GitHub"
		class="nav-link"
		href="https://github.com/AlexWarnes/svelte-fuse-rx"
	>
		<img src="/GitHub.svg" alt="GitHub logo" width="24" />
	</a>
</nav>

<slot />

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		padding: 0 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 -0.4rem 0.9rem 0.2rem #00000080;
		background: #ffffff;
		z-index: 100;
	}

	.nav-link {
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		transition: 150ms all ease;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		transition: background-color 200ms ease;
	}
	.nav-link:hover {
		background-color: #00000010;
	}

	a {
		color: #444444;
		text-decoration: none;
		margin: 0 1rem;
	}

	.logo-link {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.logo-link img {
		margin: 0 1rem 0 0;
	}

	.logo-text .fuse {
		color: #7d838d;
	}
	.logo-text .rx {
		color: var(--rxjs-purple);
	}

	.flex-spacer {
		flex-grow: 1;
	}
</style>
