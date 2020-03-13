import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Tooltip, Icon, Checkbox, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { get, isEqual } from "lodash";

import axios from "utils/axiosConfig";
import ProfilePhoto from "Containers/ProfilePhoto";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import { withRouter } from "react-router-dom";

const EditProfile = ({ form, history = {} }) => {
  const dispatch = useDispatch();

  const profile = useSelector(
    (state = {}) => get(state, "profile.data.user", {}),
    isEqual()
  );

  const { getFieldDecorator, setFieldsValue } = form;

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

  const [stateUpdate, setStateUpdate] = useState({
    isUpdating: false,
    data: {},
    error: null
  });

  // set values profile
  useEffect(() => {
    setFieldsValue({
      fullName: get(profile, "fullName"),
      username: get(profile, "username"),
      website: get(profile, "website"),
      bio: get(profile, "bio"),
      email: get(profile, "email"),
      phoneNumber: get(profile, "phoneNumber")
    });

    // return () => {};
  }, [profile, setFieldsValue]);

  // check uppercase username
  const validateUsername = (rule, value, callback) => {
    if (value && /^\S+$/gi.test(value) === false) {
      callback("Username contain whitespace");
    } else if (value && /[A-Z]+/.test(value)) {
      callback("The username has uppercase characters");
    } else {
      callback();
    }
  };

  // update profile
  const fetchUpdateProfile = useCallback(
    async values => {
      try {
        setStateUpdate(prevState => ({ ...prevState, isUpdating: true }));

        const res = await axios({
          method: "post",
          url: "/users/update",
          data: { id: get(profile, "id", ""), ...values },
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Edited profile :", res);
        setStateUpdate(prevState => ({ ...prevState, data: res.data }));

        // refresh personal store
        if (res.status === 200 || res.status === 201) {
          const data = { email: values.email };
          await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));

          message.success("Updated your profile", 5);
        }
      } catch (err) {
        console.log("Edit profile error ", err);
        message.error("Edit profile error: ", err);
      } finally {
        setStateUpdate(prevState => ({ ...prevState, isUpdating: false }));
      }
    },
    [dispatch, profile]
  );

  // submit
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          fetchUpdateProfile(values);
        }
      });
    },
    [fetchUpdateProfile, form]
  );

  // disable account
  const handleDisableAccount = async () => {
    history.push("/accounts/remove/request/temporary/");
  };

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
              },
              {
                validator: validateUsername
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
        <Form.Item label="Similar Account Suggestions">
          {getFieldDecorator("agreement", {
            valuePropName: "checked",
            rules: [
              {
                required: true,
                message: "Please check checkbox agreement"
              }
            ]
          })(
            <div className="edit-profile__form--agreement">
              <Checkbox defaultChecked>
                Include your account when recommending similar accounts people
                might want to follow.
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
            onClick={handleDisableAccount}
          >
            Temporarily disable my account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: "editProfile" })(withRouter(EditProfile));
