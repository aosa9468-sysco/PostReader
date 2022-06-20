import Field from '../Field'
import React from 'react'
import { LoginFormProps } from './login.interface'

export const LoginForm: React.VFC<LoginFormProps> = (props) => {
  const { onSubmit, ...rest } = props

  const handeOnSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string | null
    const email = formData.get('email') as string | null

    if (email && name) onSubmit && onSubmit({ email, name })
  }

  return (
    <form id='login-form' onSubmit={handeOnSubmit} {...rest}>
      <Field>
        <label id='form-name-label' htmlFor='form-name'>
          Name
        </label>
      </Field>
      <Field>
        <input id='form-name' name='name' placeholder="Enter Your Name" required/>
      </Field>
      <Field>
        <label id='form-email-label' htmlFor='form-email'>
          Email
        </label>
      </Field>
      <Field>
        <input id='form-email' name='email' placeholder="user@supermetrics.com" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" required/>
      </Field>
      <Field>
        <button type='submit'>GO</button>
      </Field>
    </form>
  )
}

export default LoginForm
