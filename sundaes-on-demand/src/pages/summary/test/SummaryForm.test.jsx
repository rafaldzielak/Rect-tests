import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("button is disabled on page load", () => {
  render(<SummaryForm />);
  const colorButton = screen.getByRole("button", { name: "BTN" });
  expect(colorButton).toBeDisabled();
});

test("Box enables on first click and disables on second", () => {
  render(<SummaryForm />);
  const colorButton = screen.getByRole("button", { name: "BTN" });
  const checkbox = screen.getByRole("checkbox", { name: /I agree the Terms and Conditions/i });
  expect(colorButton).toBeDisabled();
  userEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  userEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
  // const nullPopoverAgain = await expect(nullPopoverAgain).not.toBeInTheDocument();
});
