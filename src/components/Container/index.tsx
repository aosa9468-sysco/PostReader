import React from "react"
import { ContainerProps } from "./container.interface"


export const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props

  return <main className='Main_Container'>{children}</main>
}

export default Container