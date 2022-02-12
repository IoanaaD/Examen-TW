import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { EditFavouriteListForm } from "./EditListForm";
import http from "../../services/http";

function FavouriteListCard({ favouriteList, onFavouriteListDelete }) {
  const [currentFavouriteList, setCurrentFavouriteList] =
    useState(favouriteList);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState();

  const onFavouriteListEdit = (favouriteList) => {
    http
      .patch(`/favouriteList/${currentFavouriteList.id}`, favouriteList)
      .then((res) => {
        setCurrentFavouriteList(res.data);
        setIsEditMode(false);
        setError();
      })
      .catch((e) => {
        console.log("e", e);
        setError(e.response.data.message);
      });
  };

  return (
    <Fragment>
      {isEditMode ? (
        <EditFavouriteListForm
          favouriteList={favouriteList}
          onFavouriteListEdit={onFavouriteListEdit}
          error={error}
        />
      ) : (
        <div className="card-custom">
          <h2>The favourite list having the id: {currentFavouriteList.id}</h2>
          <p>Description: {currentFavouriteList.description}</p>
          <p>Date: {currentFavouriteList.date.split("T")[0]}</p>
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>{" "}
          <Button
            variant="danger"
            onClick={() => onFavouriteListDelete(currentFavouriteList.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default FavouriteListCard;
