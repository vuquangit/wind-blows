import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { get, isEmpty } from "lodash";
import { useSelector } from "react-redux";

import axios from "utils/axiosConfig";
import BasicTemplate from "Template/BasicTemplate";
import SearchResults from "./SearchResults";

const SearchComponent = ({ isSmallScreen = false, isScrolled = false }) => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );
  const source = axios.CancelToken.source();
  const [value, setValue] = useState("");
  const handleSearchChanged = e => {
    source.cancel("Cancel search");

    const val = e.target.value.toLowerCase();
    setValue(val);

    setState(prevState => ({
      ...prevState,
      data: [],
      error: null,
      isLoading: false,
      page: 1,
      limit: 10,
      totalItems: 0
    }));

    if (val) setIsOpenDropdown(true);
    else setIsOpenDropdown(false);
  };
  const handleSearchClick = () => {
    value && state.data && setIsOpenDropdown(true);
  };

  const [state, setState] = useState({
    data: [],
    error: null,
    isLoading: false,
    page: 1,
    limit: 10,
    totalItems: 0
  });

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));

        const response = await axios({
          method: "get",
          url: "/explore/people/search",
          params: {
            value: value,
            viewerId
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          cancelToken: source.token
        });

        if (!isEmpty(response))
          setState(prevState => ({
            ...prevState,
            data: [...prevState.data, ...response.data.data],
            totalItems: response.data.totalItems,
            isLoading: false
          }));
        else
          setState(prevState => ({
            ...prevState,
            isLoading: false
          }));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled fetch relationship");
        } else {
          setState(prevState => ({
            ...prevState,
            error: error,
            isLoading: false
          }));
          console.log(error);
        }
      }
    };

    if (value) fetchSearch();

    // unmount
    return () => {
      source.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state.page]);

  // get more page
  const hasMoreItems = state.data.length < state.totalItems;
  const getMoreItems = async () => {
    state.data.length === state.page * state.limit &&
      setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    // <BasicTemplate>
    <div className="header__search">
      <Input.Search
        placeholder="Search"
        allowClear
        loading={state.isLoading}
        onChange={handleSearchChanged}
        onClick={handleSearchClick}
      />
      {!isOpenDropdown
        ? isSmallScreen && (
            <SearchResults
              value={value}
              items={state.data}
              isLoading={state.isLoading}
              hasMoreItems={hasMoreItems}
              getMoreItems={getMoreItems}
            />
          )
        : !isScrolled && (
            <>
              <div
                className="header__search--close-dropdown"
                role="dialog"
                onClick={() => setIsOpenDropdown(false)}
              />
              <div className="header__search--dropdown-content">
                <div className="header__search--arrow-up" />
                <div className="header__search--dropdown">
                  <SearchResults
                    value={value}
                    items={state.data}
                    isLoading={state.isLoading}
                    hasMoreItems={hasMoreItems}
                    getMoreItems={getMoreItems}
                  />
                </div>
              </div>
            </>
          )}
    </div>
    //  {/* </BasicTemplate>  */}
  );
};

export default SearchComponent;
