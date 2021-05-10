import React, { useEffect, useState } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
import Toppings from "./Toppings";
import Scoop from "./Scoop";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const ItemComponent = optionType === "scoops" ? Scoop : Toppings;

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);
  return (
    <Row>
      {items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}></ItemComponent>
      ))}
    </Row>
  );
};

export default Options;
