import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const gummiCheckbox = await screen.findByRole("checkbox", { name: "Gummi bears" });
  userEvent.click(gummiCheckbox);

  const orderSummaryBtn = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderSummaryBtn);

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  screen.getByText("1 Vanilla");
  screen.getByText("2 Chocolate");
  screen.getByText("Gummi bears");

  const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  userEvent.click(termsCheckbox);
  const confirmOrderBtn = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmOrderBtn);

  const thankYouHeader = await screen.findBuRole("heading", { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderBtn);

  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // To avoid error messages
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Gummi bears" });
});
