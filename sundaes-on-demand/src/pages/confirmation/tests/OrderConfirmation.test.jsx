import { screen, render } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

test("loading shows when placing order", async () => {
  render(<OrderConfirmation />);
  screen.getByText(/loading/i);
  await screen.findByRole("heading", { name: /thank you/i });
});
