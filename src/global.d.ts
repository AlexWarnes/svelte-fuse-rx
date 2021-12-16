/// <reference types="@sveltejs/kit" />

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		rxEmit?: (event: any) => void;
		onrxEmit?: (event: Event) => void;
		rxGETPending?: (event: any) => void;
		rxGETSuccess?: (event: any) => void;
		rxGETError?: (event: any) => void;
		onrxGETPending?: (event: any) => void;
		onrxGETSuccess?: (event: any) => void;
		onrxGETError?: (event: any) => void;
		rxGETStatus?: (event: any) => void;
		onrxGETStatus?: (event: any) => void;
	}
}
