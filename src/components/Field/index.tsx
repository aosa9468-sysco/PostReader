import React from 'react'
import { FieldProps } from './field.interface'

export const Field: React.FC<FieldProps> = (props) => {
  const { children, className: incomingClassName, ...rest } = props

  let className = 'Main_Field'
  if (incomingClassName) className.concat(' ', incomingClassName)

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export default Field