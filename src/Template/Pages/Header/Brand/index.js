import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SiteName from "Components/SiteName";

const Brand = () => {
  const isHiddenIcon = useMediaQuery({ query: "(max-width: 380px)" });

  return (
    <Row className="header__brand--items">
      <Link to="/" className="header__brand">
        {!isHiddenIcon && (
          <>
            <Col xs={4} sm={4} md={4} lg={4}>
              <FontAwesomeIcon icon={faFan} className="header__brand--icon" />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <div className="header__brand--divide" />
            </Col>
          </>
        )}
        <Col xs={19} sm={19} md={19} lg={19}>
          <SiteName size={isHiddenIcon ? 18 : 24} />
        </Col>
      </Link>
    </Row>
  );
};

export default Brand;
