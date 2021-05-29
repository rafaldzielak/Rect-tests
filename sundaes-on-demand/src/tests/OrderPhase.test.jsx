import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);

  await selectScoops();
  await selectToppings();
  orderSundae();
  checkOrderSummaryPageForScoops();
  screen.getByText("Gummi bears");
  selectTermsAndConfrimOrder();
  await checkFinalPageAndStartNewOrder();

  checkStartPage();

  // To avoid error messages
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Gummi bears" });
});

test("Does not show toppings when no toppings chosen", async () => {
  render(<App />);
  await selectScoops();
  orderSundae();
  checkOrderSummaryPageForScoops();
  screen.getByText("No toppings chosen.");
});

const checkStartPage = () => {
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
};

const checkFinalPageAndStartNewOrder = async () => {
  const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderBtn);
};

const selectScoops = async () => {
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
};

const selectToppings = async () => {
  const gummiCheckbox = await screen.findByRole("checkbox", { name: "Gummi bears" });
  userEvent.click(gummiCheckbox);
};

const orderSundae = () => {
  const orderSummaryBtn = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderSummaryBtn);
};

const checkOrderSummaryPageForScoops = () => {
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  screen.getByText("1 Vanilla");
  screen.getByText("2 Chocolate");
};

const selectTermsAndConfrimOrder = () => {
  const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  userEvent.click(termsCheckbox);
  const confirmOrderBtn = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmOrderBtn);
};
