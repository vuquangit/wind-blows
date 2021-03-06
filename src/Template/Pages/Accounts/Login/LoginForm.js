import React, { useCallback, useEffect, useState } from "react";
import { Form, Icon, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty, get, isEqual } from "lodash";

import { InputAdvance, PasswordAdvance } from "Components/Input";
import { requestProfileInfo, clearMessage } from "Redux/Profile/profile.action";

const LoginForm = ({ form, history }) => {
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const dispatch = useDispatch();
  const {
    data: profileData = {},
    isFetching = false,
    message = ""
  } = useSelector((state = {}) => get(state, "profile", {}), isEqual());

  // loading submit
  const [isSubmit, setIsSubmit] = useState(false);
  const handleIsSubmit = () => setIsSubmit(true);
  const handleIsNotSubmit = () => setIsSubmit(false);

  useEffect(() => {
    dispatch(clearMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (get(window, "sessionStorage.login_username"))
      setFieldsValue({
        username: get(window, "sessionStorage.login_username", "")
        // password: get(window, "sessionStorage.login_password") || ""
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const confirmInput = useCallback(field => {
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
  }, []);

  // handle submit
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, values) => {
        if (!err) {
          handleIsSubmit();

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
          } else handleIsNotSubmit();
        }
      });
    },
    [confirmInput, fetchLogin, history, profileData, validateFields]
  );

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Username or email request" }]
        })(
          <InputAdvance
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            allowClear
            placeholder="Username or Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Password request" }]
        })(
          <PasswordAdvance
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            allowClear
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__submit"
          loading={isFetching && isSubmit}
        >
          Log In
        </Button>
      </Form.Item>
      {!!message && <Typography.Text type="danger">{message}</Typography.Text>}
    </Form>
  );
};

export default Form.create({ name: "normal_login" })(withRouter(LoginForm));
