import { screen, render } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("loading shows when placing order", async () => {
  render(<OrderConfirmation />);
  screen.getByText(/loading/i);
  await screen.findByRole("heading", { name: /thank you/i });
});

test("Error response from server for submitting order", async () => {
  server.resetHandlers(rest.post("http://localhost:3030/order", (req, res, ctx) => res(ctx.status(500))));
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("An unexpected error occurred. Please try again later.");
});
