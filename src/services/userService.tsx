import React from "react";
import saveDataInSession from "./sessionService";
import {
  AuthContextProps,
  UseAuthContext,
  UseAuth,
  RegisteredUser,
  RegisterUserFn,
} from "./userService.Interface";

const UserContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider= (props: any) => {
  const { children, ...rest } = props;
  return <UserContext.Provider value={rest}>{children}</UserContext.Provider>;
};

export const useAuthContext: UseAuthContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};

const API_REGISTER_URI = "https://api.supermetrics.com/assignment/register";

export const useAuth: UseAuth = () => {
  const [user, setUser] = saveDataInSession<RegisteredUser | null>(
    "user",
    null
  );
  const registerUser: RegisterUserFn = React.useCallback(
    async ({ name, email }) => {
      const response = await fetch(API_REGISTER_URI, {
        method: "post",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          email,
          name,
          client_id: "ju16a6m81mhid5ue1z3v2g0uh",
        }),
      });
      const body:any = await response.json();

      if (response.ok && body.data) {
        const registeredUser: RegisteredUser = {
          ...body.data,
          name,
        };
        setUser(registeredUser);

        return registeredUser;
      }

      return null;
    },
    [setUser]
  );

  const clearUser = React.useCallback(() => {
    setUser(null);
  }, [setUser]);

  return { user, registerUser, clearUser };
};

export default useAuth;
