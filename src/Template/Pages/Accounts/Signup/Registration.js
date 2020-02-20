import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get, isEmpty } from "lodash";

import { createProfile } from "Redux/Profile/profile.action";
import "./signup.scss";

const Registration = ({ form = {}, history = {} }) => {
  const dispatch = useDispatch();
  const { data: profileData, message } = useSelector(
    (state = {}) => state.profile
  );

  const [confirmDirty, setConfirmDirty] = useState(false);
  const {
    getFieldDecorator,
    setFieldsValue,
    validateFields,
    getFieldValue
  } = form;

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const validateUsername = (rule, value, callback) => {
    if (value && /^\S+$/gi.test(value) === false) {
      callback("Username contain whitespace");
    } else if (value && /[A-Z]+/.test(value)) {
      callback("The username has uppercase characters");
    } else {
      callback();
    }
  };

  // handle signup
  const fetchSignup = async data => {
    await dispatch(
      createProfile({
        data,
        endpoint: "auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        window.sessionStorage.setItem("signup_email", values.email);
        window.sessionStorage.setItem("signup_fullName", values.fullName);
        window.sessionStorage.setItem(
          "signup_username",
          values.username.trim()
        );

        await fetchSignup({
          email: values.email,
          fullName: values.fullName,
          username: values.username.trim(),
          password: values.password
        });

        if (!isEmpty(profileData)) {
          window.sessionStorage.removeItem("signup_email");
          window.sessionStorage.removeItem("signup_fullName");
          window.sessionStorage.removeItem("signup_username");
          history.push("/");
        }
      }
    });
  };

  useEffect(() => {
    if (get(window, "sessionStorage.signup_username"))
      setFieldsValue({
        email: get(window, "sessionStorage.signup_email") || "",
        fullName: get(window, "sessionStorage.signup_fullName") || "",
        username: get(window, "sessionStorage.signup_username") || ""
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="registration">
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input placeholder="Email" allowClear title="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("fullName", {
            rules: [
              {
                required: true,
                message: "Please input your full name!"
              }
            ]
          })(<Input placeholder="Full Name" title="Full Name" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input your username"
              },
              {
                validator: validateUsername
              }
            ]
          })(<Input placeholder="Username" allowClear title="Username" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your new password!"
              },
              {
                min: 8,
                message: "Length greater than 8 characters"
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(<Input.Password placeholder="Password" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: "Please confirm your new password!"
              },

              {
                min: 8,
                message: "Length greater than 8 characters"
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              placeholder="Confirm password"
              onBlur={handleConfirmBlur}
            />
          )}
        </Form.Item>
        {!!message && (
          <Typography.Text type="danger">{message}</Typography.Text>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
        <Form.Item>
          <p className="registration__terms">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy.
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedRegistration = Form.create({ name: "Registration" })(Registration);

export default withRouter(WrappedRegistration);
