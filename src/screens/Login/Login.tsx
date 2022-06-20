import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/Login'
import { LoginFormSubmitHandler } from '../../components/Login/login.interface'
import Field from '../../components/Field'
import { useAuthContext } from '../../services/userService'
import { LoginProps } from './Login.interface'
import './login.css'


export const Login: React.VFC<LoginProps> = (props) => {
  const navigate = useNavigate()
  const { registerUser, user } = useAuthContext()

  const handeOnSubmit: LoginFormSubmitHandler = async ({ name, email }) => {
    await registerUser({ name, email })
  }

  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <Field>
      <div className="login-page">
        <div className="form">
        <h2>LOGIN</h2>
          <LoginForm onSubmit={handeOnSubmit} />
        </div>
      </div>
    </Field>
  )
}

export default Login
