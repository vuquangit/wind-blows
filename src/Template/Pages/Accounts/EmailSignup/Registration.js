import React, { useState, useCallback } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import { createProfile } from "Redux/Profile/profile.action";

const RegistrationForm = ({ form, history }) => {
  const { getFieldDecorator } = form;
  const [state, setState] = useState({
    confirmDirty: false,
    autoCompleteResult: []
  });

  // state profile
  const dispatch = useDispatch();
  const { data: profileData, isFetching, message } = useSelector(
    (state = {}) => state.profile
  );

  // fetch login
  const fetchSignup = useCallback(
    async data => {
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
    },
    [dispatch]
  );

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        await fetchSignup({
          email: values.email,
          fullName: values.fullName,
          username: values.username,
          password: values.password
        });

        if (!isEmpty(profileData)) {
          history.push("/");
        }
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setState({ confirmDirty: state.confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
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
        })(<Input placeholder="Email" allowClear />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("fullName", {
          rules: [
            {
              required: true,
              message: "Please input your full name!",
              whitespace: true
            }
          ]
        })(<Input placeholder="Full Name" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: "Please input your username!",
              whitespace: false
            }
          ]
        })(<Input placeholder="Username" allowClear />)}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password placeholder="Password" allowClear />)}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input.Password
            onBlur={handleConfirmBlur}
            placeholder="Confirm Password"
            allowClear
          />
        )}
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
