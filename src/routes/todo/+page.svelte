<script lang="ts">
  import Todos from "./Todos.svelte";
  // import Alert from "./components/Alert.svelte";

  import { todos } from "$lib/stores";
</script>

<!-- <Alert /> -->
<Todos bind:todos={$todos} />
