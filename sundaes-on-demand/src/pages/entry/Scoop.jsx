import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const Scoop = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event) => {
    const { value } = event.target;

    const valueFloat = parseFloat(value);
    const valueIsValid = 0 <= valueFloat && valueFloat <= 10 && Math.floor(valueFloat) === valueFloat;
    if (!valueIsValid) {
      setIsValid(false);
      updateItemCount(name, 0);
    } else {
      setIsValid(true);
      updateItemCount(name, value);
    }
  };
  return (
    <Col xs={12} sm={12} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs='6' style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: "left" }}>
          <Form.Control isInvalid={!isValid} type='number' min={0} defaultValue={0} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default Scoop;
