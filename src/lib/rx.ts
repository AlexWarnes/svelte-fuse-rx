import { BehaviorSubject } from "rxjs";
// Mostly copied from Ben Lesh's implementation here: https://github.com/ReactiveX/rxjs/issues/4740#issuecomment-490601347
// THANK YOU BEN

class RXWritable extends BehaviorSubject<any> {
  // Enables Svelte bindings and direct assignments, for example:
  // - bind:value={$rxWritable}
  // - $rxWritable = newValue
  // - rxWritable.set(newValue)
  set(value: any) {
    super.next(value)
  }
  
  // Enables calling the Svelte writable's update() method
  // and receiving the current value as an argument for convenience, for example:
  // rxWritable.update(currentValue => {
  //    return {
  //      ...currentValue,
  //      name: "newName"
  //    }
  // })
  update(callback: any) {
    const nextValue = callback(super.value);
    super.next(nextValue)
  }
}

export function rxWritable(initialValue: any): any {
  return new RXWritable(initialValue)
}