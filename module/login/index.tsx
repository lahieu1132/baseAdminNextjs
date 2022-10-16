import "./index.scss";
import React, {useState} from "react";
import {NewPassword} from "@app/module/login/NewPassword";
import {ForgotPassword} from "@app/module/login/ForgotPassword";
import {VerifyPassword} from "@app/module/login/VerifyPassword";
import {SignIn} from "@app/module/login/SignIn";

export function Login(): JSX.Element {
  // const [data, setData] = useState({
  //   email: "",
  //   code: "",
  //   password: "",
  // });

  const [tab, setTab] = useState("signIn");

  const tabList = {
    signIn: {
      component: SignIn,
    },
    forgotPassword: {
      component: ForgotPassword,
    },
    verifyPassword: {
      component: VerifyPassword,
    },
    newPassword: {
      component: NewPassword,
    },
  };

  return (
    <div className="container-login">
      <div className="form-container">
        <div className="form">
          {React.createElement(tabList[tab as keyof typeof tabList].component, {
            changeTab: setTab,
            // data: data,
            // setData: setData,
          })}
        </div>
      </div>
    </div>
  );
}
