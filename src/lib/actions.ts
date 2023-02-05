export function selectOnFocus(node: HTMLInputElement | HTMLTextAreaElement) {
  const onFocus = (_event: Event) => node.select(); // event handler
  node.addEventListener("focus", onFocus); // when node gets focus call onFocus()
  return {
    destroy: () => node.removeEventListener("focus", onFocus), // this will be executed when the node is removed from the DOM
  };
}

export function focusOnInit(node: HTMLElement) {
  node.focus()
}

