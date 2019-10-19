import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  // #region handle
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
  // #endregion

  // #region classNames
  const searchIconClass = classNames("header__search--icon", {
    "header__search--icon-center": !isSearchFocus
  });

  const searchClearClass = classNames("header__search--clear", {
    "header__search--clear-center": !isSearchFocus
  });

  const searchInputClass = classNames("header__search--input", {
    "header__search--input-collapse": !isSearchFocus
  });
  // #endregion

  console.log(isSearchFocus);
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="header__search">
        <div className={searchIconClass} onClick={_handleSearchIsFocus}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          className={searchInputClass}
          type="text"
          autoCapitalize="none"
          placeholder="Search"
          value={searchTerm}
          onChange={_handleSearchChange}
          onClick={_handleSearchIsFocus}
        />
        {searchTerm && (
          <div
            className={searchClearClass}
            role="button"
            onClick={_handleClearSearchTerm}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
