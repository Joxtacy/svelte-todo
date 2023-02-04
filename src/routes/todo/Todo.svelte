<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { slide } from "svelte/transition";
  import type { TodoData } from "$lib/types/todo";

  export let todo: TodoData;

  let disabled = true;

  let todoInput: HTMLInputElement;

  const dispatch = createEventDispatcher();

  // $: console.log(todo?.text, todo?.done, todo?.created, todo?.modified);

  const dispatchDone = (checked: boolean) => {
    dispatch("doneUpdated", checked);
  };

  const dispatchText = (text: string) => {
    dispatch("textUpdated", text);
  };

  const handleDoneChange = (e: Event) => {
    const newChecked = (e.target as HTMLInputElement).checked;
    dispatchDone(newChecked);

    // todo.modified = new Date();
    // todo.done = newChecked;
    todo = { ...todo, modified: new Date(), done: newChecked };
  };

  const handleTextChange = (e: Event) => {
    const newText = (e.target as HTMLInputElement).value;
    dispatchText(newText);

    // todo.modified = new Date();
    // todo.text = newText;
    todo = { ...todo, modified: new Date(), text: newText };
  };

  const handleSubmit = async () => {
    disabled = !disabled;
    await tick(); // needed for the focus to work
    todoInput.focus();
  };
</script>

<form on:submit|preventDefault={handleSubmit} transition:slide>
  <input name="todo" type="checkbox" disabled={!disabled} on:change={handleDoneChange} />
  <input
    type="text"
    bind:this={todoInput}
    {disabled}
    on:change={handleTextChange}
    style:text-decoration={todo.done ? "line-through" : "none"}
    bind:value={todo.text}
  />
  <button>{disabled ? "Edit" : "Save"}</button>
</form>

<style>
</style>
