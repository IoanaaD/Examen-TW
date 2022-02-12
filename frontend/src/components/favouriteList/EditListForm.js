import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditFavouriteListForm = ({
  favouriteList,
  onFavouriteListEdit,
  error,
}) => {
  const [formData, setFormData] = useState({
    description: favouriteList.description,
    date: new Date(favouriteList.date),
  });

  const { description, date } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onFavouriteListEdit(formData);
    console.log("submit");
  };

  return (
    <Form className="card-custom" onSubmit={onSubmit}>
      <Form.Group>
        <h3>Edit the favourite list with the id: {favouriteList.id}</h3>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={onChange}
          type="text"
          name="description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <DatePicker
          selected={date}
          onChange={(date) => {
            console.log("date", date);
            setFormData({ ...formData, date });
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      )}
    </Form>
  );
};
