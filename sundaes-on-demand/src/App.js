import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetails, OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <div className='App'>
      <OrderDetailsProvider>
        <Container>
          <OrderEntry />
        </Container>
      </OrderDetailsProvider>
    </div>
  );
}

export default App;
