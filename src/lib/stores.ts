import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { TodoData } from "$lib/types/todo";

const TODOS = "joxtacy.todos";

const fromLocalStorage = (storageKey: string, fallbackValue: TodoData[] = []) => {
  if (browser) {
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue != undefined && storedValue !== null) {
      return JSON.parse(storedValue);
    }
  }

  return fallbackValue;
};

const toLocalStorage = (store, storageKey: string) => {
  if (browser) {
    store.subscribe((value) => {
      const storageValue = JSON.stringify(value);
      localStorage.setItem(storageKey, storageValue);
    });
  }
};

export const localStore = <T extends JsonValue>(key: string, initial: T) => {
  // receives the key of the local storage and an initial value

  if (browser) {
    const toString = (value: T) => JSON.stringify(value, null, 2); // helper function
    const toObj = JSON.parse; // helper function

    if (localStorage.getItem(key) === null) {
      // item not present in local storage
      localStorage.setItem(key, toString(initial)); // initialize local storage with initial value
    }

    const saved = toObj(localStorage.getItem(key)); // convert to object

    const { subscribe, set, update } = writable<T>(saved); // create the underlying writable store

    return {
      subscribe,
      set: (value: T) => {
        localStorage.setItem(key, toString(value)); // save also to local storage as a string
        return set(value);
      },
      update,
    };
  }

  return writable<T>(initial); // create the underlying writable store
};

export const todos = localStore<TodoData[]>(TODOS, []);

// export const todos = writable(fromLocalStorage(TODOS, []));
// toLocalStorage(todos, TODOS);

// export const todos = writable<TodoData[]>(JSON.parse(localStorage.get(TODOS) ?? JSON.stringify([])));

// todos.subscribe((value) => localStorage.set(TODOS, JSON.stringify(value)));
