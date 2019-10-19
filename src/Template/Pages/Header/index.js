import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimesCircle,
  faFan
} from "@fortawesome/free-solid-svg-icons";
import { Layout, Row, Col } from "antd";
// import { classNames } from 'classnames'
import "./header.scss";

export default function Header() {
  const { Header } = Layout;
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  const _handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  const _handleClearSearchTerm = () => {
    setSearchTerm("");
    setIsSearchFocus(false);
  };

  const _handleSearchIsFocus = () => {
    setIsSearchFocus(true);
  };

  // console.log(classNames({ "foo-bar": true }));

  console.log(searchTerm, isSearchFocus);

  return (
    <Layout>
      <Header className="header">
        <div className="header__content">
          <Row className="header__content--row">
            <Col xs={12} sm={6} md={8}>
              <a href="/" className="header__brand d-flex align-items-center">
                <FontAwesomeIcon icon={faFan} className="header__brand--icon" />
                <div className="header__brand--divide" />
                <h3 className="header__brand--text">The Wind Blows</h3>
              </a>
            </Col>
            <Col
              xs={0}
              sm={10}
              md={8}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="header__search">
                <div className="header__search--search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  className="header__search--input"
                  type="text"
                  autoCapitalize="none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={_handleSearchChange}
                  onFocus={_handleSearchIsFocus}
                />
                {searchTerm && (
                  <div
                    className="header__search--search-clear"
                    role="button"
                    onClick={_handleClearSearchTerm}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </div>
                )}
              </div>
            </Col>
            <Col xs={12} sm={8} md={8}>
              Profile User
            </Col>
          </Row>
        </div>
      </Header>
    </Layout>
  );
}
