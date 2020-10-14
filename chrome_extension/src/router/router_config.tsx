import { FunctionComponent } from "react"

import Login from "@/pages/login"
import Home from "@/pages/home"

export interface IRouter {
  component: FunctionComponent
  path: string
  exact?: boolean
  routers?: IRouter[]
}

const routerConfig: IRouter[] = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: Login,
    path: "/login",
  },
]

export default routerConfig
