<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import FilterButtons from "./FilterButtons.svelte";
  import Todo from "./Todo.svelte";
  import MoreActions from "./MoreActions.svelte";
  import NewTodo from "./NewTodo.svelte";
  import TodosStatus from "./TodosStatus.svelte";
  import type { Filter, TodoData } from "$lib/types/todo";
  // import { alert } from "$lib/stores";

  export let todos: TodoData[] = [];

  // `end` is used to only show the empty list item when last item leaves the dom. This is done using the `on:outroend` event
  let end: boolean = todos.length === 0;

  let todosStatus: any; // reference to TodosStatus instance

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name: string) {
    const newDate = new Date();
    todos = [
      ...todos,
      { id: newTodoId, name, completed: false, created: newDate, modified: newDate },
    ];
    // $alert = `Todo '${name}' has been added`;
  }

  function removeTodo(todo: TodoData) {
    todos = todos.filter((t) => t.id !== todo.id);
    todosStatus.focus(); // give focus to status heading
    // $alert = `Todo '${todo.name}' has been deleted`;
  }

  function updateTodo(todo: TodoData) {
    const i = todos.findIndex((t) => t.id === todo.id);
    if (todos[i].name !== todo.name) {
      // $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`;
    }
    if (todos[i].completed !== todo.completed) {
      // $alert = `todo '${todos[i].name}' marked as ${todo.completed ? "completed" : "active"}`;
    }
    todos[i] = { ...todos[i], ...todo };
  }

  const checkAllTodos = (completed: boolean) => {
    const newDate = new Date();
    todos = todos.map((t) => ({ ...t, completed, modified: newDate })); // `modified` will get updated even though potentially nothing changed
    // $alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} to-dos`;
  };

  const removeCompletedTodos = () => {
    // $alert = `Removed ${todos.filter((t) => t.completed).length} to-dos`;
    todos = todos.filter((t) => !t.completed);
  };

  let filter: Filter = "all";
  const filterTodos = (filter: Filter, todos: TodoData[]) =>
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "completed"
      ? todos.filter((t) => t.completed)
      : todos;
  $: {
    if (filter === "all") {
      // $alert = "Browsing all to-dos";
    } else if (filter === "active") {
      // $alert = "Browsing active to-dos";
    } else if (filter === "completed") {
      // $alert = "Browsing completed to-dos";
    }
  }
</script>

<h1>Svelte to-do list</h1>
<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

  <!-- Filter -->
  <FilterButtons bind:filter />

  <!-- TodosStatus -->
  <TodosStatus bind:this={todosStatus} {todos} />

  <!-- Todos -->
  <ul class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
      <li
        class="todo"
        in:fade={{ easing: cubicInOut }}
        out:fly={{ delay: 150, duration: 500, x: -1000, y: 0, easing: cubicInOut }}
        on:outroend={() => (end = filterTodos(filter, todos).length === 0)}
        on:introstart={() => (end = false)}
      >
        <Todo
          {todo}
          on:update={(e) => updateTodo(e.detail)}
          on:remove={(e) => removeTodo(e.detail)}
        />
      </li>
    {:else}
      {#if end}
        <li in:fade={{ duration: 500, easing: cubicInOut }}>Nothing to do here!</li>
      {/if}
    {/each}
  </ul>

  <hr />

  <!-- MoreActions -->
  <MoreActions
    {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />
</div>
