import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/favouriteLists">Favourite Lists</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/videos">Videos</Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
    </Nav>
  );
};

export default Navbar;
