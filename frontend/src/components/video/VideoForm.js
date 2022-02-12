import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import http from "../../services/http";

export const VideoForm = ({ onVideoAdd, error }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    favouriteListId: "",
  });

  const [favouriteLists, setFavouriteLists] = useState([]);
  let getFavouriteLists = async () => {
    http.get("/favouriteList").then((res) => setFavouriteLists(res.data));
  };

  useEffect(() => {
    getFavouriteLists();
  }, []);

  const { favouriteListId, description, title, url } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const obj = { ...formData };
    if (!obj.favouriteListId) {
      obj.favouriteListId = favouriteLists[0].id;
    }
    onVideoAdd({ ...obj });
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>Add a new video</h3>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={onChange}
          type="text"
          name="title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={onChange}
          type="text"
          name="description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Url</Form.Label>
        <Form.Control value={url} onChange={onChange} type="text" name="url" />
      </Form.Group>
      <Form.Label>FavouriteList</Form.Label>
      <Form.Select
        className="mb-3"
        value={favouriteListId}
        onChange={(e) =>
          setFormData({ ...formData, favouriteListId: e.target.value })
        }
        aria-label="Default select example"
      >
        {favouriteLists.map((avouriteList) => (
          <option value={avouriteList.id}>{avouriteList.description}</option>
        ))}
      </Form.Select>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
};
