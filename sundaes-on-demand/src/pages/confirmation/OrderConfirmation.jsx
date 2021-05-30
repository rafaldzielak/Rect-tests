import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [error, setError] = useState(null);
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        setError("An unespected error occurred. Please try again later");
      });
  }, []);
  const handleClick = () => {
    resetOrder();
    setOrderPhase("in Progress");
  };
  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }
  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p style={{ fontSize: "25%" }}>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>New Order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
