import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Menu,
  Dropdown,
  Checkbox,
  Button
} from "antd";
import ProfilePhoto from "Components/ProfilePhoto";

const EditProfile = props => {
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
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
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

  const genderLists = (
    <Menu>
      <Menu.Item key="1">Male</Menu.Item>
      <Menu.Item key="2">Female</Menu.Item>
      <Menu.Item key="3">Custom</Menu.Item>
      <Menu.Item key="4">Prefer Not To Say</Menu.Item>
    </Menu>
  );

  return (
    <div className="edit-profile">
      <div className="edit-profile__photo">
        <ProfilePhoto {...formItemLayout} changePhoto={true} />
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Website">
          <Input />
        </Form.Item>
        <Form.Item label="Bio">
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 9999999 }} />
        </Form.Item>
        <Form.Item label=" " className="edit-profile__form--private">
          <h2 className="private__text">Private Information</h2>
        </Form.Item>
        <Form.Item label="E-mail">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item label="Gender">
          <Dropdown overlay={genderLists}>
            <Button block className="edit-profile__form--gender">
              Male <Icon type="down" />
            </Button>
          </Dropdown>
        </Form.Item>
        <Form.Item label="Similar Account Suggestions">
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <div className="edit-profile__form--agreement">
              <Checkbox>
                I have read the <a href="/accounts/edit">agreement</a>
              </Checkbox>
            </div>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="danger" style={{ marginLeft: "16px" }}>
            Disable my account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedEditProfile = Form.create({ name: "editProfile" })(EditProfile);

export default WrappedEditProfile;
