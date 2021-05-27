import React, { useEffect, useState } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
import Toppings from "./Toppings";
import Scoop from "./Scoop";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  const ItemComponent = optionType === "scoops" ? Scoop : Toppings;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) return <AlertBanner />;
  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map((item, index) => (
          <ItemComponent
            key={item.name + index}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }></ItemComponent>
        ))}
      </Row>
    </>
  );
};

export default Options;
