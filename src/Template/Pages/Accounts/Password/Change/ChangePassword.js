import React, { useState } from "react";
import ProfilePhoto from "Containers/ProfilePhoto";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./changePassword.scss";

const ChangePassword = props => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

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
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
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

  return (
    <div className="change-password">
      <div className="change-password__photo">
        <ProfilePhoto {...formItemLayout} changePhoto={false} />
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
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
        <Form.Item label="New Password" hasFeedback>
          {getFieldDecorator("newPassword", {
            rules: [
              {
                required: true,
                message: "Please input your new password!"
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
                validator: compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
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
