import { User } from "../../services/userService.Interface"

export type LoginFormSubmitHandler = (user: User) => void
export interface LoginFormProps
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  onSubmit?: LoginFormSubmitHandler
}