import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// hook forms
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLogin, SigninSchema } from "./LoginSchema";
// redux
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/auth.actions";

// ui
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Col, Form, Row } from "react-bootstrap";
import { FormInputText } from "../../components/FormComponents/FormInputText";
import CustomButton from "../../components/Button/CustomButton";

interface LoginFormProps {}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();
  
// navigate
  let navigate = useNavigate();

  // hook-forms
  const methods = useForm<FormLogin>({
    resolver: yupResolver(SigninSchema),
  });
  const { handleSubmit, control } = methods;

// useState
  const [eye, setEye] = React.useState(true);
  const [password, setPassword] = React.useState("password");

// methods
  const togglePassword = () => {
    if (password === "password") {
      setPassword("text");
      setEye(false);
    } else {
      setPassword("password");
      setEye(true);
    }
  };

  const onSubmit = (data: FormLogin) => {
    console.time("submit");
    dispatch(login(data));
    setTimeout(() => {
      let user: any;
      const _user = localStorage.getItem("user");
      if (_user) {
        user = JSON.parse(_user);
      }
      if (user) {
        if (user.user.admin_roles) {
          setTimeout(() => navigate("/admin/admin-dashboard"), 1000);
        } else {
          setTimeout(() => navigate("/dashboard"), 1000);
        }
      }
    }, 1000);
    console.timeEnd("submit");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormInputText
        name="username"
        control={control}
        label="Username / E-mail"
      />

      <FormInputText
        name="password"
        control={control}
        label="Password"
        type={password}
        endAdornment={
          <span onClick={togglePassword} className="show-hide-icon">
            {eye ? <EyeSlash /> : <Eye />}
          </span>
        }
      />
      <CustomButton
        variant="link"
        className="login__cta--forgot-password rl_link"
        onClick={() => navigate("/reset-password/forgot-password")}
      >
        Forgot Password?
      </CustomButton>
      <Row>
        <Col md="auto">
          <CustomButton
            type="submit"
            className="btn btn-primary login__cta--signin"
          >
            Sign In
          </CustomButton>
        </Col>
        <Col>
          <CustomButton
            className="btn btn-primary login__cta--signin"
            onClick={() => navigate("/register")}
          >
            New Account
          </CustomButton>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
