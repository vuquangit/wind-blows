import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { get } from "lodash";
import { useSelector } from "react-redux";

import axios from "utils/axiosConfig";
import BasicTemplate from "Template/BasicTemplate";
import SearchResults from "./SearchResults";

const SearchComponent = () => {
  const { id: viewerId = "" } = useSelector((state = {}) =>
    get(state, "profile.data.user", {})
  );

  const source = axios.CancelToken.source();

  const [value, setValue] = useState("");
  const handleSearchChanged = e => {
    source.cancel("Cancel search");

    setValue(e.target.value.toLowerCase());
    setState(prevState => ({
      ...prevState,
      data: [],
      error: null,
      isLoading: false,
      page: 1,
      limit: 10,
      totalItems: 0
    }));
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

        setState(prevState => ({
          ...prevState,
          data: [...prevState.data, ...response.data.data],
          totalItems: response.data.totalItems,
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

  return (
    // <BasicTemplate>
      <div className="header__search">
        <Input.Search
          placeholder="Search"
          allowClear
          loading={state.isLoading}
          onChange={handleSearchChanged}
        />
        <SearchResults
          value={value}
          items={state.data}
          isLoading={state.isLoading}
          hasMoreItems={hasMoreItems}
          getMoreItems={getMoreItems}
        />
      </div>
    {/* </BasicTemplate> */}
  );
};

export default SearchComponent;
