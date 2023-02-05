<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { selectOnFocus } from "$lib/actions";
  const dispatch = createEventDispatcher();

  export let autofocus = false;

  let name = "";
  let nameEl: HTMLInputElement;

  onMount(() => autofocus && nameEl.focus());

  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
    nameEl.focus(); // give focus to the name input
  };

  const onCancel = () => {
    name = "";
    nameEl.focus(); // give focus to the name input
  };
</script>

<form on:submit|preventDefault={addTodo} on:keydown={(e) => e.key === "Escape" && onCancel()}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">What needs to be done?</label>
  </h2>
  <input
    use:selectOnFocus
    bind:this={nameEl}
    bind:value={name}
    type="text"
    id="todo-0"
    autoComplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
</form>
