# svelte-fuse-rx

## 0.1.1

### Patch Changes

- 0896667: add rxjs as dep, bump to v7.6

## 0.1.0

### Minor Changes

- 3065ab6: BREAKING: rxWritable should be invoked like a svelte writable without instantiation using new (e.g. const x = rxWritable(value)). This makes the api more closely aligned with svelte's
