---
'svelte-fuse-rx': minor
---

BREAKING: rxWritable should be invoked like a svelte writable without instantiation using new (e.g. const x = rxWritable(value)). This makes the api more closely aligned with svelte's
