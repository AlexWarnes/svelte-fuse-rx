import {
	BehaviorSubject,
	EMPTY,
	of,
	Subscription,
	debounceTime,
	skip,
	throttleTime,
	bufferTime,
	bufferCount,
	filter,
	catchError,
	map,
	switchMap,
	tap
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

export type RxEvent = 'input' | 'change' | 'mousemove' | string;

export function rxDebounce(node, options?: { on?: RxEvent; duration?: number }) {
	let event: RxEvent = options?.['on'] || 'input';
	let duration = options?.['duration'] || 250;

	let valueSubscription: Subscription; // holds our subscription
	let value$ = new BehaviorSubject(node.value || '');

	function initSubscriptions() {
		valueSubscription = value$.pipe(skip(1), debounceTime(duration)).subscribe((evt) => {
			node.dispatchEvent(new CustomEvent('rxEmit', { detail: evt }));
		});
	}

	initSubscriptions();

	const handleEvent = (e) => value$.next(e);
	node.addEventListener(event, handleEvent, true);

	return {
		update(newOptions) {
			// Tear down previous event listener
			node.removeEventListener(event, handleEvent, true);

			// Re-establish scoped variables that may have changed
			event = newOptions?.['on'] || 'input';
			duration = newOptions?.['duration'] || 250;
			value$ = new BehaviorSubject(node.value || '');

			// Re-init subscription to use new duration
			initSubscriptions();

			// Add event listener to use new event
			node.addEventListener(event, handleEvent, true);
		},
		destroy() {
			node.removeEventListener(event, handleEvent, true);
			valueSubscription.unsubscribe();
		}
	};
}
export function rxThrottle(node, options?: { on?: RxEvent; duration?: number }) {
	let event: RxEvent = options?.['on'] || 'mousemove';
	let duration = options?.['duration'] || 250;

	let valueSubscription: Subscription; // holds our subscription
	let value$ = new BehaviorSubject(node.value || '');

	function initSubscriptions() {
		valueSubscription = value$.pipe(skip(1), throttleTime(duration)).subscribe((evt) => {
			node.dispatchEvent(new CustomEvent('rxEmit', { detail: evt }));
		});
	}

	initSubscriptions();

	const handleEvent = (e) => value$.next(e);
	node.addEventListener(event, handleEvent, true);

	return {
		update(newOptions) {
			// Tear down previous event listener
			node.removeEventListener(event, handleEvent, true);

			// Re-establish scoped variables that may have changed
			event = newOptions?.['on'] || 'mousemove';
			duration = newOptions?.['duration'] || 250;
			value$ = new BehaviorSubject(node.value || '');

			// Re-init subscription to use new duration
			initSubscriptions();

			// Add event listener to use new event
			node.addEventListener(event, handleEvent, true);
		},
		destroy() {
			node.removeEventListener(event, handleEvent, true);
			valueSubscription.unsubscribe();
		}
	};
}

export function rxBufferTime(node, options?: { on?: RxEvent; duration?: number }) {
	let event: RxEvent = options?.['on'] || 'mousemove';
	let duration = options?.['duration'] || 500;

	let valueSubscription: Subscription; // holds our subscription
	let value$ = new BehaviorSubject(null);

	function initSubscriptions() {
		valueSubscription = value$
			.pipe(
				filter((v) => !!v),
				bufferTime(duration),
				filter((evtList) => evtList && evtList.length > 0)
			)
			.subscribe((evtList) => {
				node.dispatchEvent(new CustomEvent('rxEmit', { detail: evtList }));
			});
	}

	initSubscriptions();

	const handleEvent = (e) => value$.next(e);
	node.addEventListener(event, handleEvent, true);

	return {
		update(newOptions) {
			// Tear down previous event listener
			node.removeEventListener(event, handleEvent, true);

			// Re-establish scoped variables that may have changed
			event = newOptions?.['on'] || 'mousemove';
			duration = newOptions?.['duration'] || 500;
			value$ = new BehaviorSubject(null);

			// Re-init subscription to use new duration
			initSubscriptions();

			// Add event listener to use new event
			node.addEventListener(event, handleEvent, true);
		},
		destroy() {
			node.removeEventListener(event, handleEvent, true);
			valueSubscription.unsubscribe();
		}
	};
}

export function rxBufferCount(node, options?: { on?: RxEvent; count?: number }) {
	let event: RxEvent = options?.['on'] || 'mousemove';
	let count = options?.['count'] || 25;

	let valueSubscription: Subscription; // holds our subscription
	let value$ = new BehaviorSubject(null);

	function initSubscriptions() {
		valueSubscription = value$
			.pipe(
				filter((v) => !!v),
				bufferCount(count),
				filter((evtList: UIEvent[]) => evtList && evtList.length > 0)
			)
			.subscribe((evtList: UIEvent[]) => {
				node.dispatchEvent(new CustomEvent('rxEmit', { detail: evtList }));
			});
	}

	initSubscriptions();

	const handleEvent = (e) => value$.next(e);
	node.addEventListener(event, handleEvent, true);

	return {
		update(newOptions) {
			// Tear down previous event listener
			node.removeEventListener(event, handleEvent, true);

			// Re-establish scoped variables that may have changed
			event = newOptions?.['on'] || 'mousemove';
			count = newOptions?.['count'] || 25;
			value$ = new BehaviorSubject(null);

			// Re-init subscription to use new count
			initSubscriptions();

			// Add event listener to use new event
			node.addEventListener(event, handleEvent, true);
		},
		destroy() {
			node.removeEventListener(event, handleEvent, true);
			valueSubscription.unsubscribe();
		}
	};
}

export function rxGet(path: string): any {
	return ajax.getJSON(path).pipe(
		// Directs request errors into a subscriber's "error" callback
		catchError((err) => {
			console.log('rxGet Error: ', err);
			return of(err);
		})
	);
}

export interface rxGETFromInputOptions {
	baseURL: string;
	queryParamKey?: string;
	queryParams?: string;
	debounceTime?: number;
	formatInput?: (val) => any;
}

export interface rxGETStatusDetails {
	status: 'EMPTY' | 'DEBOUNCING' | 'PENDING' | 'SUCCESS' | 'ERROR';
	value: any;
}
export function rxGETFromInput(node, options: rxGETFromInputOptions): any {
	let requestOptions: Partial<rxGETFromInputOptions> = {
		debounceTime: 500,
		formatInput: (val) => String(val)
	};

	if (options) {
		requestOptions = {
			...requestOptions,
			...options
		};
	}
	let input$ = new BehaviorSubject<string>(null);
	const handleInput = (evt) => {
		input$.next(String(evt.target.value));
	};
	node.addEventListener('input', handleInput);
	let fetchData$;
	const initFetchDataStream = () => {
		fetchData$ = input$
			.pipe(
				tap((value: string) => {
					node.dispatchEvent(
						new CustomEvent('rxGETStatus', {
							detail: {
								status: !!value && !!value.trim() ? 'DEBOUNCING' : 'EMPTY',
								value
							} as rxGETStatusDetails
						})
					);
				}),
				debounceTime(requestOptions.debounceTime),
				filter((value: string) => value !== undefined && value !== null && !!value.trim()),
				tap((value: string) =>
					node.dispatchEvent(
						new CustomEvent('rxGETStatus', {
							detail: { status: 'PENDING', value } as rxGETStatusDetails
						})
					)
				),
				map((_value: string) => {
					const value = _value.trim();
					const formattedValue = requestOptions['formatInput'](value);
					return formattedValue;
				}),
				switchMap((val) => {
					const valParam = requestOptions['queryParamKey']
						? `${requestOptions['queryParamKey']}=${val}`
						: '';
					const otherParams = requestOptions['queryParams'] ? requestOptions['queryParams'] : '';
					let queryParams = '';
					if (valParam && otherParams) {
						queryParams = `${valParam}&${otherParams}`;
					} else if (valParam || otherParams) {
						queryParams = `${valParam || otherParams}`;
					}
					let encodedParams = encodeURI(queryParams);
					return rxGet(
						`${requestOptions['baseURL']}${encodedParams ? '?' + encodedParams : ''}`
					).pipe(catchError(() => EMPTY)); // return EMPTY to avoid auto unsubscribing on error
				})
			)
			.subscribe({
				next: (response: any) => {
					if (response?.message?.includes('error')) {
						node.dispatchEvent(
							new CustomEvent('rxGETStatus', {
								detail: { status: 'ERROR', value: response } as rxGETStatusDetails
							})
						);
					} else {
						node.dispatchEvent(
							new CustomEvent('rxGETStatus', {
								detail: { status: 'SUCCESS', value: response } as rxGETStatusDetails
							})
						);
					}
				}
			});
	};

	initFetchDataStream();
	return {
		update(options: rxGETFromInputOptions) {
			if (options) {
				requestOptions = {
					...requestOptions,
					...options
				};
			}

			fetchData$.unsubscribe();
			initFetchDataStream();
		},
		destroy() {
			fetchData$.unsubscribe();
		}
	};
}
