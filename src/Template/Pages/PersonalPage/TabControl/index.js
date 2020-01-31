import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import PersonalPost from "./PersonalPost";
import postList from "./changgio.json";
import "./tabControl.scss";
import Axios from "axios";
import IsLoading from "Components/IsLoading";
import { useDispatch, useSelector } from "react-redux";

const TabControl = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: [],
    error: null,
    limit: 20,
    page: 1
  });

  const { id: ownerId = "" } = useSelector(
    (state = {}) => state.personalProfile.data.user
  );

  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL || "";

  useEffect(() => {
    const feactData = async () => {
      try {
        const response = await Axios({
          method: "get",
          url: `${SERVER_BASE_URL}/posts`,
          params: {
            id: ownerId,
            limit: state.limit,
            page: state.page
          },
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("response: ", response);

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data]
        }));
      } catch (err) {
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };

    feactData();
  }, [SERVER_BASE_URL, ownerId, state.limit, state.page]);

  return (
    <div>
      <Row>Tab</Row>
      <Row>
        {state.isLoading ? (
          <IsLoading isLoading={state.isLoading} />
        ) : state.data.length > 0 ? (
          state.data.map((item, idx) => (
            <Col key={item.id || idx} span={8}>
              <PersonalPost {...item} />
            </Col>
          ))
        ) : (
          <div>No post</div>
        )}
      </Row>
    </div>
  );
};

export default TabControl;
