import React, { useCallback, useEffect } from "react";
import { Form, Icon, Input, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { requestProfileInfo } from "Redux/Profile/profile.action";

const LoginForm = ({ form, history }) => {
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  // Check login
  const dispatch = useDispatch();
  const { data: profileData, isFetching, message } = useSelector(
    (state = {}) => state.profile
  );

  // fetch login
  const fetchLogin = useCallback(
    async data => {
      await dispatch(
        requestProfileInfo({
          data,
          endpoint: "auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
      );
    },
    [dispatch]
  );

  const confirmInput = field => {
    // Check if email
    // eslint-disable-next-line
    if (/\@/.test(field)) {
      // Validate email address
      // eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field)) {
        return { type: "email", isValid: true };
      }
      return { type: "email", isValid: false };
    } else {
      // Validate username
      if (!field) return { type: "username", isValid: false };
      else return { type: "username", isValid: true };
    }
  };

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        // save local storage
        window.sessionStorage.setItem("login_username", values.username);
        // window.sessionStorage.setItem("login_password", values.password);
        const typeInput = await confirmInput(values.username);

        if (typeInput.type === "email")
          await fetchLogin({
            email: values.username,
            username: undefined,
            password: values.password
          });
        else
          await fetchLogin({
            email: undefined,
            username: values.username,
            password: values.password
          });

        if (!isEmpty(profileData)) {
          window.sessionStorage.removeItem("login_username");
          // window.sessionStorage.removeItem("login_password");
          history.push("/");
        }
      }
    });
  };

  useEffect(() => {
    if (get(window, "sessionStorage.login_username"))
      setFieldsValue({
        username: get(window, "sessionStorage.login_username") || ""
        // password: get(window, "sessionStorage.login_password") || ""
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Username, or email" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Password" }]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__submit"
          loading={isFetching}
        >
          Log In
        </Button>
      </Form.Item>
      {!!message && <Typography.Text type="danger">{message}</Typography.Text>}
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default withRouter(WrappedLoginForm);
