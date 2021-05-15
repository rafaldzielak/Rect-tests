import React from "react";
import { Col } from "react-bootstrap";

const Scoop = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={12} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </Col>
  );
};

export default Scoop;