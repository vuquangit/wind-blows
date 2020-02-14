import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty, get } from "lodash";

import { createProfile } from "Redux/Profile/profile.action";

const RegistrationForm = ({ form, history }) => {
  // state profile
  const dispatch = useDispatch();
  const { data: profileData, isFetching, message } = useSelector(
    (state = {}) => state.profile
  );

  const { getFieldDecorator, setFieldsValue, validateFields } = form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(["confirm"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  // fetch login
  const fetchSignup = async data => {
    await dispatch(
      createProfile({
        data,
        endpoint: "/auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        window.sessionStorage.setItem("signup_email", values.email);
        window.sessionStorage.setItem("signup_fullname", values.fullname);
        window.sessionStorage.setItem("signup_username", values.username);
        window.sessionStorage.setItem("signup_password", values.password);

        console.log(values);
        await fetchSignup({
          email: values.email,
          fullName: values.fullName,
          username: values.username,
          password: values.password
        });

        if (!isEmpty(profileData)) {
          window.sessionStorage.removeItem("signup_email");
          window.sessionStorage.removeItem("signup_fullname");
          window.sessionStorage.removeItem("signup_username");
          window.sessionStorage.removeItem("signup_password");
          history.push("/");
        }
      }
    });
  };

  useEffect(() => {
    if (get(window, "sessionStorage.signup_username"))
      setFieldsValue({
        email: get(window, "sessionStorage.signup_email") || "",
        fulName: get(window, "sessionStorage.signup_fullName") || "",
        username: get(window, "sessionStorage.signup_username") || "",
        password: get(window, "sessionStorage.signup_password") || ""
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateUsername = (rule, value, callback) => {
    if (value) {
      if (/[A-Z]/g.test(value) && /\s/gi.test(value)) {
        callback("Non white space and upper case character");
      } else if (/\s/g.test(value)) {
        callback("Non white space character");
      } else if (/([A-Z])/g.test(value)) {
        callback("Non upper case character");
      } else if (/@/g.test(value)) {
        callback("Please do not enter the @ character");
      }
    } else {
      callback();
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="registration">
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
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: "Please input your username!"
            },
            {
              whitespace: false,
              message: "Non white space character"
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
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("confirm", {
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
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="registration__submit"
          loading={isFetching}
        >
          Sign up
        </Button>
      </Form.Item>
      {!!message && <Typography.Text type="danger">{message}</Typography.Text>}
      <Form.Item>
        <p className="registration__terms">
          By signing up, you agree to our Terms , Data Policy and Cookies
          Policy.
        </p>
      </Form.Item>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default withRouter(WrappedRegistrationForm);
