import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { get } from "lodash";
import axios from "axios";

import ProfilePhoto from "Containers/ProfilePhoto";
import "./changePassword.scss";

const ChangePassword = props => {
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";
  const { isAuthenticateLogin = false, id: ownerId = "" } =
    useSelector((state = {}) => get(state, "profile.data.user")) || {};

  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirmNewPassword"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const [stateUpdate, setStateUpdate] = useState({
    isUpdating: false,
    data: {},
    error: null
  });

  const fetchChangePassword = async values => {
    try {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: true }));

      const res = await axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/change-password`,
        data: { userId: ownerId, ...values },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Edited profile :", res);
      setStateUpdate(prevState => ({ ...prevState, data: res.data }));
      message.success("Updated your profile", 5);
    } catch (err) {
      console.log("Change password error ", err);
      message.error("Change password error: ", 5);
      setStateUpdate(prevState => ({ ...prevState, error: err }));
    } finally {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: false }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetchChangePassword(values);
      }
    });
  };

  return (
    <div className="change-password">
      <div className="change-password__photo">
        <ProfilePhoto {...formItemLayout} changePhoto={false} />
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        {!isAuthenticateLogin && (
          <Form.Item label="Old Password" hasFeedback>
            {getFieldDecorator("oldPassword", {
              rules: [
                {
                  required: true,
                  message: "Please input your old password!"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
        )}
        <Form.Item label="New Password" hasFeedback>
          {getFieldDecorator("newPassword", {
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
        <Form.Item label="Confirm New Password" hasFeedback>
          {getFieldDecorator("confirmNewPassword", {
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
        {!!stateUpdate.error && (
          <Typography.Text type="danger">{`Old password not correct`}</Typography.Text>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to="/accounts/password/reset/">Forgot password ?</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedChangePassword = Form.create({ name: "changePassword" })(
  ChangePassword
);

export default WrappedChangePassword;
