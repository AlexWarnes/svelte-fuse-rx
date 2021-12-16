<script>
	import LinkBtn from './LinkBtn.svelte';
</script>

<div class="img-box">
	<div class="col">
		<img class="watermark svelte" src="/svelteLogo.svg" alt="svelte logo" height="48px" />

		<LinkBtn href="https://svelte.dev/" background="var(--svelte-orange)"
			><span>Learn Svelte</span>
			<img class="chevron" src="/ChevronRight.svg" alt="arrow-right" width="18" />
		</LinkBtn>
	</div>
	<div class="col">
		<img class="watermark rxjs" src="/rxLogo.svg" alt="rxjs logo" height="48px" />

		<LinkBtn href="https://rxjs.dev/" background="var(--rxjs-purple)">
			<span>Learn RxJS</span>
			<img class="chevron" src="/ChevronRight.svg" alt="arrow-right" width="18" />
		</LinkBtn>
	</div>
</div>

<style>

	.img-box {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		min-width: 320px;
    z-index: 10;
	}

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

	.watermark {
		opacity: 0.75;
    margin: 0 0 1rem 0;
	}

	.watermark.svelte {
		width: 40px;
		vertical-align: top;
	}
	.watermark.rxjs {
		width: 40px;
		vertical-align: bottom;
	}

</style>
