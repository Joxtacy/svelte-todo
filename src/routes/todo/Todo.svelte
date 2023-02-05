<script lang="ts">
  import type { TodoData } from "$lib/types/todo.js";
  import { createEventDispatcher } from "svelte";
  import { focusOnInit, selectOnFocus } from "$lib/actions";

  export let todo: TodoData;

  let editing = false;
  let name = todo.name;
  let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save

  const dispatch = createEventDispatcher();

  function update(updatedTodo: TodoData) {
    todo = { ...todo, ...updatedTodo };

    dispatch("update", todo);
  }

  function onCancel() {
    name = todo.name; // restores name to its initial value and
    editing = false; // and exit editing mode
  }

  function onSave() {
    const newDate = new Date();
    update({ ...todo, name, modified: newDate }); // updates todo name
    editing = false; // and exit editing mode
  }

  function onRemove() {
    dispatch("remove", todo); // emit remove event
  }

  async function onEdit() {
    editButtonPressed = true; // user pressed the Edit button, focus will come back to the Edit button
    editing = true; // enter editing mode
  }

  function onToggle() {
    const newDate = new Date();
    update({ ...todo, completed: !todo.completed, modified: newDate }); // updates todo status
  }

  const focusEditButton = (node: HTMLButtonElement) => {
    editButtonPressed && node.focus();
  };
</script>

<div class="stack-small">
  {#if editing}
    <!-- markup for editing todo: label, input text, Cancel and Save Button -->
    <form
      on:submit|preventDefault={onSave}
      class="stack-small"
      on:keydown={(e) => e.key === "Escape" && onCancel()}
    >
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
        <input
          use:selectOnFocus
          use:focusOnInit
          bind:value={name}
          type="text"
          id="todo-{todo.id}"
          autoComplete="off"
          class="todo-text"
        />
      </div>
      <div class="btn-group">
        <button class="btn todo-cancel" on:click={onCancel} type="button">
          Cancel<span class="visually-hidden">renaming {todo.name}</span>
        </button>
        <button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
          Save<span class="visually-hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
    <div class="c-cb">
      <input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed} />
      <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
        Edit<span class="visually-hidden"> {todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete<span class="visually-hidden"> {todo.name}</span>
      </button>
    </div>
  {/if}
</div>
