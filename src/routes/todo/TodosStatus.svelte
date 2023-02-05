<script lang="ts">
  import type { TodoData } from "$lib/types/todo";

  export let todos: TodoData[];

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((t) => t.completed).length;

  let headingEl: HTMLHeadingElement;

  export const focus = () => headingEl.focus();
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
  {completedTodos} out of {totalTodos} todo{totalTodos === 1 ? "" : "s"} completed
</h2>
