import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBook from "./pages/addBook/AddBook";
import EditBook from "./pages/editBook/EditBook";
import Home from "./pages/home/Home";
import SingleBook from "./pages/singleBook/SingleBook";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<SingleBook />} />
          <Route path="/AddBook/" element={<AddBook />} />
          <Route path="/editBook/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
