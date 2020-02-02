import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Menu,
  Dropdown,
  Checkbox,
  Button,
  message
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import Axios from "axios";

import ProfilePhoto from "Components/ProfilePhoto";
import { updateProfileInfo } from "Redux/Profile/profile.action";

const EditProfile = props => {
  const dispatch = useDispatch();
  const profile = useSelector((state = {}) => state.profile.data.user);

  useEffect(() => {
    setFieldsValue({
      fullName: get(profile, "fullName"),
      username: profile.username,
      website: profile.website,
      bio: get(profile, "bio"),
      email: get(profile, "email"),
      phoneNumber: get(profile, "phoneNumber"),
      gender: get(profile, "gender")
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  // post
  const [stateUpdate, setStateUpdate] = useState({
    isUpdating: false,
    data: {},
    error: null
  });

  // update profile
  const fetchUpdateProfile = async values => {
    try {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: true }));

      const res = await Axios({
        method: "post",
        url: `${SERVER_BASE_URL}/users/update`,
        data: { id: get(profile, "id"), ...values },
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      setStateUpdate(prevState => ({ ...prevState, data: res.data }));

      // fetch personal post data
      if (res.status === 200 || res.status === 201) {
        const data = { email: values.email };
        await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));

        message.success("Updated your profile");
      }
      // ....
    } catch (err) {
      console.log(err);
      message.error("Post status error: ", err);
    } finally {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: false }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetchUpdateProfile(values);
      }
    });
  };

  const { getFieldDecorator, setFieldsValue } = props.form;

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
        <ProfilePhoto {...formItemLayout} changePhoto />
      </div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("fullName", {
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
          {getFieldDecorator("website")(<Input />)}
        </Form.Item>
        <Form.Item label="Bio">
          {getFieldDecorator("bio")(
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 9999999 }} />
          )}
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
          {getFieldDecorator("phoneNumber")(<Input />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator("gender")(
            <Dropdown overlay={genderLists}>
              <Button block className="edit-profile__form--gender">
                Male <Icon type="down" />
              </Button>
            </Dropdown>
          )}
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
          <Button
            type="primary"
            htmlType="submit"
            loading={stateUpdate.isUpdating}
          >
            Submit
          </Button>
          <Button
            type="danger"
            style={{ marginLeft: "16px" }}
            disabled={stateUpdate.isUpdating}
          >
            Disable my account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedEditProfile = Form.create({ name: "editProfile" })(EditProfile);

export default WrappedEditProfile;
