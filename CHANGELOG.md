# svelte-fuse-rx

## 0.1.0

### Minor Changes

- 3065ab6: BREAKING: rxWritable should be invoked like a svelte writable without instantiation using new (e.g. const x = rxWritable(value)). This makes the api more closely aligned with svelte's
