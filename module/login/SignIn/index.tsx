import "./index.scss";
import {Formik} from "formik";
import {Form, Image, Row} from "antd";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser, {ILoginBody} from "@app/api/ApiUser";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useRouter} from "next/router";
import Config from "@app/config";
import {IAccountInfo} from "@app/types";

interface SignInProps {
  changeTab: (tab: string) => void;
}
export function SignIn({changeTab}: SignInProps): JSX.Element {
  const dispatch = useDispatch();

  const router = useRouter();

  const loginMutation = useMutation(ApiUser.login);

  const handleLogin = (
    values: ILoginBody,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    loginMutation.mutate(
      {email: values.email, password: values.password},
      {
        onSuccess: (res: IAccountInfo) => {
          dispatch(loginUser({...res}));
          router.push(Config.PATHNAME.HOME);
          setSubmitting(false);
        },
        onError: (error) => {
          setSubmitting(false);
        },
      }
    );
  };
  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validateOnChange={false}
      validateOnBlur
      // validate={loginValidation}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
      }): JSX.Element => (
        <div className="container-sign-in">
          <Form onFinish={handleSubmit} className="container-sign-in">
            <div className="header-wrapper">
              <Image
                className="login-image"
                src="img/logo.png"
                preview={false}
              />
              <div className="login-text">Đăng nhập</div>
            </div>
            <div>
              <TextInput
                placeholder="Nhập tài khoản"
                label="Tài khoản"
                value={values.email}
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="email"
              />
            </div>
            <div className="pt-20">
              <TextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="password"
                type="password"
              />
            </div>
            <Row
              role="button"
              tabIndex={0}
              className="forgot-pass pt-20"
              onClick={(): void => changeTab("forgotPassword")}
            >
              Quên mật khẩu?
            </Row>

            <ButtonSubmit
              label="Đăng nhập"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
