<script lang="ts">
  import Todo from "./Todo.svelte";
  //import type { TodoData } from "$lib/types/todo";
  import { todos as todosStore } from "$lib/stores";

  $: console.log($todosStore);

  let input = "";

  // let todos: TodoData[] = [];

  const addTodo = () => {
    if (input === "") {
      return;
    }
    const now = new Date();
    // $todosStore = [...$todosStore, { text: input, done: false, created: now, modified: now }];
    todosStore.update((todos) => [
      ...todos,
      { text: input, done: false, created: now, modified: now },
    ]);
    input = "";
  };
</script>

<form on:submit|preventDefault={addTodo}>
  <input type="text" bind:value={input} />
  <input type="button" on:click={addTodo} value="Add" />
</form>

<div id="todos-container">
  {#each $todosStore as todo}
    <Todo
      on:doneUpdated={(e) => console.log("Done updated:", e.detail)}
      on:textUpdated={(e) => console.log("Text updated:", e.detail)}
      {todo}
    />
  {/each}
</div>
