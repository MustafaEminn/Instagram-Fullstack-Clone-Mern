import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { postData } from "../../utils/API";
import { API_URL } from "../../utils/API_SETTINGS";

interface authroute {
  children: React.ReactChild;
  to: string;
}

const AuthRouteDefault = ({ children, to }: authroute) => {
  const [auth, setAuth] = useState(false);
  const link = useHistory();

  useEffect(() => {
    const authCheck = async () => {
      var dataPromise = postData(`${API_URL}/api/auth/authCheck`);
      var data = await dataPromise;
      if (data?.data.success) {
        setAuth(true);
      } else {
        link.push("/");
      }
    };
    authCheck();
  }, []);

  return (
    <Fragment>{auth ? <Route path={to}>{children}</Route> : void 0}</Fragment>
  );
};

export default AuthRouteDefault;
