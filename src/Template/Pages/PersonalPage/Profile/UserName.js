import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const Username = ({ verified = true }) => {
  return (
    <div className="personal__header--username">
      <Row type="flex" justify="start" className="account">
        <Col>
          <h1 className="username">chang.gio</h1>
        </Col>
        {verified && (
          <Col>
            <span className="verified" title="Verified">
              Verified
            </span>
          </Col>
        )}
        <Col>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <Link to="/accounts/edit/" className="edit-account">
                <button type="button">Edit Profile</button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="account-setting item-center" title="Account settings">
            <FontAwesomeIcon icon={faUserCog} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={0}>
          <Link
            to="/accounts/edit/"
            className="edit-account"
            title="Edit Profile"
          >
            <button type="button">Edit Profile</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Username;
