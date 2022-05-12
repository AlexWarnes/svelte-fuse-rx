<script lang="ts">
	import { rxWritable } from '$lib/rx';

	import {
		rxBufferCount,
		rxBufferTime,
		rxDebounce,
		rxGETFromInput,
		rxGETStatusDetails,
		rxThrottle
	} from '$lib/rxActions';
	import { debounceTime, filter, map, tap } from 'rxjs';
	import DocTitleRow from '../components/DocTitleRow.svelte';
	let debouncedText = '';
	let nonDebouncedText = '';
	let reqStatus = 'IDLE';
	let repos = [];
	let resultsPP = 5;
	const mousemove = new rxWritable(null);
	const mouseXYDiff = mousemove.pipe(
		filter((evt) => !!evt),
		debounceTime(200),
		map((evt) => {
			return { x: evt.clientX, y: evt.clientY };
		}),
		tap((position) => console.log('rxWritable:', position)),
		map((position) => position.x - position.y)
	);
	const handleInputChange = (event) => {
		// Do something cool
		console.log('Debounced Input Value:', event.target.value);
		debouncedText = event.target.value;
	};
	const handleNonDebouncedInputChange = (event) => {
		nonDebouncedText = event.target.value;
	};
	const handleMousemoveCoords = (event) => {
		// Do something cool
		console.log('Throttled Mouse Coords:', [event.detail.clientX, event.detail.clientY]);
	};
	const handleMousemoveBuffer = (event) => {
		// Do something cool
		// event.detail is an array of events that occurred during your buffer time
		console.log(
			'Buffered Mouse Coords:',
			event.detail.map((deet) => [deet.clientX, deet.clientY])
		);
	};

	const baseURL = 'https://api.github.com/search/repositories';
	const handleRequest = (eventDetail: rxGETStatusDetails) => {
		const { status, response } = eventDetail;
		reqStatus = status;

		if (status === 'SUCCESS') {
			repos = response.items;
		} else {
			repos = [];
		}
	};
</script>

<svelte:head>
	<title>svelte-fuse-rx | Docs</title>
</svelte:head>
<main>
	<h1>PIPEABLE STORE</h1>

	<DocTitleRow
		title="rxWritable"
		replURL="https://svelte.dev/repl/4d252d989eef4df08ff27a0347e558ef"
	/>
	<p class="description">
		Use an rxWritable just like a Svelte writable, but with the option to <code>pipe</code> RxJS operators
		and compose streams. It has all the benefits of simple Svelte store syntax + robust RxJS utility.
	</p>
	<div on:mousemove={(event) => ($mousemove = event)} class="box">
		(mousemove over)
		<span>mouseXYDiff: {JSON.stringify($mouseXYDiff)}</span>
		<pre>
{`
  const mousemove = new rxWritable(null);
  const mouseXYDiff = mousemove.pipe(
    filter(evt => !!evt),
    debounceTime(200),
    map(evt => {
      return {x: evt.clientX, y: evt.clientY}
    }),
    tap(position => console.log("rxWritable:", position)),
    map(position => position.x - position.y)
  )

  <div on:mousemove={event => $mousemove = event}>
    (mousemove over)
    <span>mouseXYDiff: {JSON.stringify($mouseXYDiff)}</span>
  </div>
`}			
	</pre>
	</div>

	<h1>ACTIONS</h1>
	<DocTitleRow
		title="use:rxDebounce"
		replURL="https://svelte.dev/repl/84fcad9f6883466593f088e67bc350c4"
	/>
	<p class="description">
		Emits the most recent event via <code>rxEmit(event => event.detail)</code> after events have stopped
		for x number of milliseconds, as specified by the duration option (default is 250ms). Useful when
		you only want to handle an event after activity has stopped.
	</p>

	<div class="dbInput box">
		<input
			type="text"
			placeholder="Enter text"
			use:rxDebounce={{ on: 'input', duration: 400 }}
			on:rxEmit={handleInputChange}
			on:input={handleNonDebouncedInputChange}
		/>
		<p class="label">Debounced Text:</p>
		<span class="output-text">{debouncedText}</span>
		<p class="label">Non-Debounced Text:</p>
		<span class="output-text">{nonDebouncedText}</span>

		<pre>
{`<input
  use:rxDebounce
  on:rxEmit={handleInputChange}
/>`}
		</pre>
	</div>

	<DocTitleRow
		title="use:rxGETFromInput"
		replURL="https://svelte.dev/repl/af04d78f5e0b4bddb6a9ba35e4844f69"
	/>
	<p class="description">
		Makes a GET request using the input value whenever it changes. The rxGETStatus event will emit
		with event detail whenever the status changes. Pending requests are automatically cancelled when
		a new request is made. Use options to adjust the debounce time, query parameters, or a
		formatting function if you want to customize how the input value is used.
	</p>
	<h3>Events:</h3>
	<code>on:rxGETStatus</code>
	<h4>Event Detail Schema:</h4>
	<ul>
		<li>
			<code>status: </code>
			<code class="code-block">'EMPTY'</code>
			<code class="code-block">'DEBOUNCING'</code>
			<code class="code-block">'PENDING'</code>
			<code class="code-block">'SUCCESS'</code>
			<code class="code-block">'ERROR'</code>
		</li>
		<li><code>value: string;</code> the current input value</li>
		<li>
			<code>response: any</code> contains the response object when status is SUCCESS or ERROR,
			otherwise <code>null</code>
		</li>
	</ul>
	<div class="dbInput box">
		<label for="rxGETFromInput">Query</label>
		<input
			id="rxGETFromInput"
			type="text"
			placeholder="svelte shader"
			use:rxGETFromInput={{
				baseURL,
				queryParamKey: 'q',
				queryParams: `per_page=${resultsPP}`
			}}
			on:rxGETStatus={(e) => handleRequest(e.detail)}
		/>
		<label for="per_page">Results Per Page</label>
		<input id="per_page" type="range" bind:value={resultsPP} min="1" max="10" step="1" />
		<span>{resultsPP}</span>
		<p class="label">Request Status:</p>
		<span class="output-text {reqStatus}">{reqStatus}</span>
		<p class="label">Results: ({repos.length})</p>
		<div class="result-box">
			{#each repos as repo (repo.id)}
				<a class="card-wrapper" href={repo.html_url}>
					<div class="card">
						<p class="name">
							{repo.name}
						</p>
						<span class="rating">{repo.stargazers_count} stars</span>
					</div>
				</a>
			{/each}
		</div>

		<pre>
{`
import { rxGETFromInput, rxGETStatusDetails } from 'svelte-fuse-rx';

let reqStatus = 'IDLE';
let repos = [];

const handleRequest = (eventDetail: rxGETStatusDetails) => {
  const { status, response } = eventDetail;
  reqStatus = status;

  if (status === 'SUCCESS') {
    repos = response.items;
  } else {
    repos = [];
  }
};

// ...

<input
  use:rxGETFromInput={{
    baseURL,
    queryParamKey: 'q',
    queryParams: 'per_page=${resultsPP}'
  }}
  on:rxGETStatus={(e) => handleRequest(e.detail)}
/>`}
		</pre>
	</div>

	<DocTitleRow title="use:rxThrottle" replURL="" />
	<p class="description">
		Emits an event (if one occurs) via <code>rxEmit(event => event.detail)</code> every x number of milliseconds,
		as specified by the throttle duration option (default is 250ms). Useful when you only want to handle
		an event every x number of milliseconds.
	</p>
	<div
		use:rxThrottle={{ on: 'mousemove', duration: 1000 }}
		on:rxEmit={handleMousemoveCoords}
		class="box"
	>
		<p>(mousemove over and watch console)</p>
		<pre>
{`<div
  use:rxThrottle={{ 
    on: 'mousemove', 
    duration: 1000 
  }}
  on:rxEmit={handleMousemoveCoords}
>
`}
		</pre>
	</div>

	<DocTitleRow title="use:rxBufferTime" replURL="" />
	<p class="description">
		Emits an array of events via <code>rxEmit(event => event.detail)</code> that have accumulated over
		the specified number of milliseconds (default is 250ms). If no event has occurred, it will not emit
		empty arrays.
	</p>
	<div
		use:rxBufferTime={{ on: 'mousemove', duration: 250 }}
		on:rxEmit={handleMousemoveBuffer}
		class="box"
	>
		<p>(mousemove over and watch console)</p>
		<pre>
{`<div
  use:rxBufferTime={{ 
    on: 'mousemove', 
    duration: 250 
  }}
  on:rxEmit={handleMousemoveBuffer}
>
`}
		</pre>
	</div>

	<DocTitleRow title="use:rxBufferCount" replURL="" />
	<p class="description">
		Emits an array of events via <code>rxEmit(event => event.detail)</code> when the specified count
		is reached (default is 25).
	</p>
	<div use:rxBufferCount={{ on: 'mousemove' }} on:rxEmit={handleMousemoveBuffer} class="box">
		<p>(mousemove over and watch console)</p>
		<pre>
{`<div
  use:rxBufferCount={{ 
    on: 'mousemove', 
    count: 25 
  }}
  on:rxEmit={handleMousemoveBuffer}
>
`}
		</pre>
	</div>
</main>

<style>
	h1 {
		border-bottom: 1px solid var(--rxjs-purple);
	}

	.box {
		width: 95%;
		max-width: 800px;
		margin: 0 0 4rem 0;
		padding: 1rem;
		border: 1px solid #d0d7de;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.dbInput.box {
		justify-content: flex-start;
		align-items: flex-start;
	}

	.label {
		margin-bottom: 0.25rem;
		font-weight: 600;
	}
	.output-text {
		font-size: 0.9rem;
		padding-left: 5px;
		border-left: 5px solid transparent;
	}

	.output-text.SUCCESS {
		border-left: 5px solid #2e8b57;
	}
	.output-text.PENDING {
		border-left: 5px solid #daa520;
	}

	.result-box {
		width: 100%;
		overflow: auto;
		height: 7rem;
	}

	li {
		margin: 1rem 0;
	}
	.card-wrapper {
		color: #333333;
		text-decoration: none;
	}
	.card-wrapper:hover .card {
		border: 1px solid #333333;
		cursor: pointer;
	}

	.card {
		width: 100%;
		margin: 0.25rem auto;
		border: 1px solid #dddddd;
		padding: 12px;
		border-radius: 3px;
		position: relative;
		transition: border 0.2s ease-in-out;
	}
	.name {
		font-weight: 600;
		margin: 0;
	}

	.rating {
		font-size: 0.75em;
		position: absolute;
		right: 12px;
		top: 12px;
	}

	code.code-block {
		display: block;
		width: fit-content;
	}
</style>
