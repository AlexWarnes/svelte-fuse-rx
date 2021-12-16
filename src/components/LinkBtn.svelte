<script>
	export let background = 'var(--fuse-gradient)';
	export let style = '';
	export let href = '';
</script>

{#if href}
	<a {href}>
		<button style={`background: ${background}; ${style}`}>
			<slot />
		</button>
	</a>
{:else}
	<button style={`background: ${background}; ${style}`}>
		<slot />
	</button>
{/if}

<style>
	button {
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: 4px;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-size: 0.8rem;
	}

	button:hover {
		text-decoration: underline;
	}

	a {
		text-decoration: none;
	}
</style>
