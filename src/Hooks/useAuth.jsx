import { useContext } from "react";
import { context } from "../ContextProvider/Provider";

const useAuth = () => {
  const auth = useContext(context);
  return auth;
};

export default useAuth;
