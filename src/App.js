import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPokemon from "./pages/ViewPokemon";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemon/:id" element={<ViewPokemon />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
