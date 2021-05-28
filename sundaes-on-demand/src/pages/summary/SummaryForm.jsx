import React, { useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false);
  const popover = (
    <Popover id='termsandconditions-popover'>
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const label = (
    <span>
      I agree the
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase("completed");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          id='Toggle BTN'
          label={label}></Form.Check>
      </Form.Group>
      <Button type='submit' disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
