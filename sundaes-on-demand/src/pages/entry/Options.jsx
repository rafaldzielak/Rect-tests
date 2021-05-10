import React, { useEffect, useState } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
import Toppings from "./Toppings";
import Scoop from "./Scoop";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const ItemComponent = optionType === "scoops" ? Scoop : Toppings;

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) return <AlertBanner />;
  return (
    <Row>
      {items.map((item) => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}></ItemComponent>
      ))}
    </Row>
  );
};

export default Options;
