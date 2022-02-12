import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Alert } from "react-bootstrap";

export const FavouriteListForm = ({ onFavouriteListAdd, error }) => {
  const [formData, setFormData] = useState({
    description: "",
    date: new Date(),
  });

  const { description, date } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onFavouriteListAdd({ ...formData, date: date.toString() });
    console.log("submit");
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>Add a new favourite list</h3>
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
        Add new list
      </Button>
      {error && (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      )}
    </Form>
  );
};
