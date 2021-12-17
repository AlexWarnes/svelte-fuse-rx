<script>
	import LinkBtn from './LinkBtn.svelte';

	export let title = '';
	export let replURL = '';
</script>

<div class="doc-title-row">
	<h2>{title}</h2>
	<LinkBtn href={replURL}>
		<span>REPL</span>
		<img class="chevron" src="/ChevronRight.svg" alt="arrow-right" width="18" />
	</LinkBtn>
</div>

<style>
	.doc-title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
