import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postData } from "./API";
import { API_URL } from "./API_SETTINGS";

interface authmiddleware {
  onAuth: string | boolean;
  noAuth: string | boolean;
}

const AuthMiddleware = ({ onAuth, noAuth }: authmiddleware) => {
  const link = useHistory();

  useEffect(() => {
    return async () => {
      var dataPromise = postData(`${API_URL}/api/auth/authCheck`);
      var data = await dataPromise;
      if (data?.data.success) {
        return onAuth ? link.push(onAuth as string) : true;
      } else {
        return noAuth ? link.push(noAuth as string) : false;
      }
    };
  }, []);
  return <></>;
};

export default AuthMiddleware;
