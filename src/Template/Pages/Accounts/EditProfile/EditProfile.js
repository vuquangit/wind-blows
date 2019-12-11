import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Menu,
  Dropdown,
  Select,
  Checkbox,
  Button,
  Avatar,
  Row,
  Col
} from "antd";

//#region const arguments
const { Option } = Select;

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

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "84"
  })(
    <Select style={{ width: 70 }}>
      <Option value="84">+84</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const genderLists = (
    <Menu>
      <Menu.Item key="1">Male</Menu.Item>
      <Menu.Item key="2">Female</Menu.Item>
      <Menu.Item key="3">Custom</Menu.Item>
      <Menu.Item key="4">Prefer Not To Say</Menu.Item>
    </Menu>
  );
  //#endregion

  return (
    <div className="edit-profile">
      <div className="edit-profile__photo">
        <Row type="flex" align="middle">
          <Col {...formItemLayout.labelCol}>
            <div className="edit-profile__photo--avatar">
              <Avatar
                src="https://live.staticflickr.com/65535/49150573271_52eb21ac75_z.jpg"
                size={40}
              />
            </div>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <div className="edit-profile__photo--change">
              <div>
                <h1>chang.gio</h1>
                <button>Change Profile Photo</button>
              </div>
            </div>
          </Col>
        </Row>
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
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
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
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedRegistrationForm = Form.create({ name: "editProfile" })(
  EditProfile
);

export default WrappedRegistrationForm;
