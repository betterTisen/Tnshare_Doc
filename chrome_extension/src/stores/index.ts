// ./src/stores/index.ts
import { createContext, useContext } from "react"
import { STATE_KEY, StateStore } from "./state"
import { STORE_TODO, TodoStore } from "./todo"

export const stores = { [STATE_KEY]: new StateStore(), [STORE_TODO]: new TodoStore() }

const StoresContext = createContext(stores)

export const useStateStore = () => {
  const { stateStore } = useContext(StoresContext)
  return stateStore
}

export const useTodoStore = () => {
  const { todoStore } = useContext(StoresContext)
  return todoStore
}
