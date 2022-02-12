import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import http from "../../services/http";

export const EditVideoForm = ({ video, onVideoEdit }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    url: video.url,
    description: video.description,
    favouriteListId: video.favouriteListId,
  });

  const { favouriteListId, description, title, url } = formData;

  const [favouriteLists, setFavouriteLists] = useState([]);
  let getFavouriteLists = async () => {
    http.get("/favouriteList").then((res) => setFavouriteLists(res.data));
  };

  useEffect(() => {
    getFavouriteLists();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onVideoEdit(formData);
    console.log("submit");
  };

  return (
    <Form className="card-custom" onSubmit={onSubmit}>
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
        defaultValue={favouriteListId}
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
    </Form>
  );
};
