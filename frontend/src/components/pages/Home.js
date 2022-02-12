/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import FavouriteListCard from "../favouriteList/ListCard";
import http from "../../services/http";
import { FavouriteListForm } from "../favouriteList/ListForm";
import { Button, Pagination } from "react-bootstrap";

const Home = () => {
  const [favouriteLists, setFavouriteLists] = useState([]);
  const [favouriteListsToDisplay, setFavouriteListsToDisplay] = useState([]);
  const [paginationArray, setPaginationArray] = useState([]);
  const PAGINATION_SIZE = 3;

  const calculatePagination = (elements) => {
    let x = {};
    console.log("ELEMENTS FOR PAGINATION", elements);
    const size = elements.length / PAGINATION_SIZE;
    console.log("size", size);
    let newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(i + 1);
    }

    Object.values(x).forEach((key) => newArray.push(x[key]));
    console.log("new array", newArray);
    setPaginationArray([...newArray]);
    console.log("x", x);
  };

  let getCurrentProfile = async () => {
    axios.get(`/favouriteList`).then((res) => {
      setFavouriteLists(res.data);
      calculatePagination(res.data);
    });
  };

  const getCurrentProfilePaginated = async (page, sortType = "ASC") => {
    axios
      .get(
        `/favouriteList/pagination/?size=${PAGINATION_SIZE}&page=${
          page - 1
        }&sortType=${sortType}`
      )
      .then((res) => {
        console.log("pagination", res.data);
        setFavouriteListsToDisplay(res.data.rows);
      });
  };

  const [activePage, setActivePage] = useState(1);
  const [addError, setAddError] = useState();

  useEffect(() => {
    getCurrentProfile();
    getCurrentProfilePaginated(1);
  }, []);

  const onFavouriteListDelete = (id) => {
    http.delete(`/favouriteList/${id}`).then((res) => {
      const newArray = favouriteLists.filter(
        (favouriteList) => favouriteList.id !== id
      );
      setFavouriteLists([...newArray]);
      calculatePagination(newArray);
      getCurrentProfilePaginated(activePage);
    });
  };

  const onFavouriteListAdd = ({ description, date }) => {
    http
      .post("/favouriteList", { description, date })
      .then((res) => {
        setFavouriteLists([...favouriteLists, res.data]);
        getCurrentProfilePaginated(activePage);
        calculatePagination([...favouriteLists, res.data]);

        setAddError();
      })
      .catch((e) => {
        setAddError(e.response.data.message);
        console.error(e.message);
      });
  };
  const sortListsDescending = () => {
    axios.get("/favouriteList/date/DESC").then((res) => {
      setFavouriteLists([...res.data]);
      getCurrentProfilePaginated(activePage, "DESC");
    });
  };

  const sortListsAscending = () => {
    axios.get("/favouriteList/date/ASC").then((res) => {
      setFavouriteLists([...res.data]);
      getCurrentProfilePaginated(activePage);
    });
  };
  const changePaginationPage = (page) => {
    setActivePage(page);
    getCurrentProfilePaginated(page);
  };
  return (
    <>
      <div>
        <FavouriteListForm
          onFavouriteListAdd={onFavouriteListAdd}
          error={addError}
        />
        <div className="my-3">
          <Button onClick={sortListsDescending}>
            Sort lists by date DESCENDING
          </Button>
          <Button onClick={sortListsAscending} className="mx-4">
            Sort lists by date ASCENDING
          </Button>
        </div>

        {favouriteListsToDisplay.length > 0 &&
          favouriteListsToDisplay.map((favouriteList) => (
            <FavouriteListCard
              key={favouriteList.id}
              onFavouriteListDelete={onFavouriteListDelete}
              favouriteList={favouriteList}
            />
          ))}

        <Pagination>
          {paginationArray.map((number) => {
            console.log("number", number);
            return (
              <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => changePaginationPage(number)}
              >
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </div>
    </>
  );
};

export default Home;
