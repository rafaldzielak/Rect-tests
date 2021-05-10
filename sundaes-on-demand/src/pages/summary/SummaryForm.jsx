import React, { useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = () => {
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

  return (
    <Form>
      <Form.Group>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          id='Toggle BTN'
          label={label}></Form.Check>
      </Form.Group>
      <Button disabled={!checked}>BTN</Button>
    </Form>
  );
};

export default SummaryForm;
