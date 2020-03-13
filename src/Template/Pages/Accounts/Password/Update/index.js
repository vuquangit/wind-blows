import React, { useState, useEffect } from "react";
import { Form, Button, message, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get, isEmpty, isEqual } from "lodash";
import axios from "utils/axiosConfig";

import { PasswordAdvance } from "Components/Input";
import { updateProfileInfo } from "Redux/Profile/profile.action";
import ProfilePhoto from "Containers/ProfilePhoto";
import Pinwheel from "Components/Loaders/Pinwheel";
import "./changePassword.scss";

const ChangePassword = ({
  form,
  isResetPassword = false,
  match = {},
  history = {}
}) => {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state = {}) => get(state, "profile.data.user", {}),
    isEqual()
  );
  const { isAuthenticateLogin = false } = profile;
  const [isCheckingTokenReset, setIsCheckingTokenReset] = useState(false);
  const [profileData, setProfileData] = useState(profile);
  console.log("isAuthenticateLogin", isAuthenticateLogin);

  // check token reset password
  useEffect(() => {
    const source = axios.CancelToken.source();

    if (isEmpty(profile)) {
      const resetPasswordToken = get(match, "params.token", "");

      const fetchEmail = async () => {
        setIsCheckingTokenReset(true);

        try {
          const res = await axios({
            method: "get",
            url: "/users/reset-password",
            params: { resetPasswordToken },
            headers: {
              "Content-Type": "application/json"
            },
            cancelToken: source.token
          });
          console.log(res);

          setProfileData(get(res, "data", {}));
          setIsCheckingTokenReset(false);
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log("cancelled fetch token reset");
          } else {
            console.log("Change password error ", err);
            message.error("Password reset link is invalid or has expried", 5);
            setIsCheckingTokenReset(false);
          }
        }
      };

      resetPasswordToken && fetchEmail();
    }

    // unmount
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = form;
  const formItemLayout = isResetPassword
    ? {}
    : {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 17 }
        }
      };
  const tailFormItemLayout = isResetPassword
    ? {}
    : {
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
    if (value && confirmDirty) {
      form.validateFields(["confirmNewPassword"], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
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

  // handle change
  const [stateUpdate, setStateUpdate] = useState({
    isUpdating: false,
    error: null
  });

  const fetchChangePassword = async values => {
    try {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: true }));

      await axios({
        method: "post",
        url: "/users/change-password",
        data: {
          ...values,
          userId: profileData.id || "",
          isConfirmOldPassword: !isResetPassword && !isAuthenticateLogin
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = { email: profileData.email || "" };
      await dispatch(updateProfileInfo({ data, endpoint: "auth/me" }));

      message.success("Updated your password", 5);

      if (isResetPassword) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log("Change password error ", err);
      message.error("Change password error", 5);
      setStateUpdate(prevState => ({ ...prevState, error: err }));
    } finally {
      setStateUpdate(prevState => ({ ...prevState, isUpdating: false }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetchChangePassword(values);
      }
    });
  };

  return (
    <div className="change-password">
      {isCheckingTokenReset ? (
        <Pinwheel size={48} />
      ) : (
        <>
          {!isResetPassword && (
            <div className="change-password__photo">
              <ProfilePhoto {...formItemLayout} changePhoto={false} />
            </div>
          )}
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            {!isEmpty(profileData) ? (
              <>
                {!isResetPassword && !isAuthenticateLogin && (
                  <Form.Item label="Old Password" hasFeedback>
                    {getFieldDecorator("oldPassword", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your old password!"
                        }
                      ]
                    })(<PasswordAdvance placeholder="Old password" />)}
                  </Form.Item>
                )}
                <Form.Item
                  label={!isResetPassword && `New Password`}
                  hasFeedback
                >
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
                  })(<PasswordAdvance placeholder="New password" />)}
                </Form.Item>
                <Form.Item
                  label={!isResetPassword && `Confirm New Password`}
                  hasFeedback
                >
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
                  })(
                    <PasswordAdvance
                      onBlur={handleConfirmBlur}
                      placeholder="Confirm new password"
                    />
                  )}
                </Form.Item>
                {!!stateUpdate.error && (
                  <Typography.Text type="danger">
                    Old password not correct
                  </Typography.Text>
                )}
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={stateUpdate.isUpdating}
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </>
            ) : (
              <Typography.Text type="danger">
                Password reset link is invalid or has expried
              </Typography.Text>
            )}
            <Form.Item {...tailFormItemLayout}>
              <Link to="/accounts/password/reset/">Forgot password ?</Link>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

// const WrappedChangePassword = Form.create({ name: "changePassword" })(
//   ChangePassword
// );

// export default withRouter(WrappedChangePassword);

export default Form.create({ name: "changePassword" })(
  withRouter(ChangePassword)
);
