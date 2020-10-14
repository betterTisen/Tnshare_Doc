//  ./src/stores/todo.ts
import { action, observable } from "mobx"

export class StateStore {
  @observable token = "0"
  @observable loading = false

  @action.bound handleSetToken(token: string) {
    this.token = token
  }
  @action.bound handleSetLoading(state: boolean) {
    this.loading = state
  }
}

export const STATE_KEY = "stateStore"
