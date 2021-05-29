import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("Handles error for scoops and toppings router", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => res(ctx.status(500)))
  );
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disables order sundae button when no scoop is selected", async () => {
  render(<OrderEntry />);
  const orderBtn = screen.getByRole("button", { name: /order sundae/i });
  expect(orderBtn).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderBtn).toBeEnabled();
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderBtn).toBeDisabled();
});
