import { BrowserRouter, Routes, Route } from "react-router-dom";
import Juego from "./pages/Juego";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Juego />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
