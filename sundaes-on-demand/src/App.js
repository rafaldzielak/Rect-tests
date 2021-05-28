import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetails, OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <div className='App'>
      <OrderDetailsProvider>
        <Container>
          <Component setOrderPhase={setOrderPhase} />
        </Container>
      </OrderDetailsProvider>
    </div>
  );
}

export default App;
