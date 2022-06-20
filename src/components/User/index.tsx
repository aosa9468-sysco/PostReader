import React from 'react'
import { UserProps } from './user.interface'
import './user.css'

export const User: React.FC<UserProps> = (props) => {
  const { style, postCount = 0, sender,index,selectedIndex, ...rest } = props

  return (
    <div className={index === selectedIndex ? "userLoad active" : "userLoad"} {...rest}>
      <span aria-label='sender name'>{sender}</span>
      <div style={{ flexGrow: 1 }} />
      <span aria-label='sender post count'><b>{postCount}</b></span>
    </div>
  )
}

export default User
