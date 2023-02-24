import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./contexts/message";
import { Router } from "./routes";
import { LayoutBase } from "./components/LayoutBase";
import "antd/dist/reset.css";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <LayoutBase>
        <MessageProvider>
          <Router />
        </MessageProvider>
      </LayoutBase>
    </BrowserRouter>
  );
}

export default App;
