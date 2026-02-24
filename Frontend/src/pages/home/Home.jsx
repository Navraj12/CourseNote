import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://project1-1-3wxp.onrender.com/book"
      );
      if (response.status === 200) {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-evenly mt-20">
        {books.length > 0 &&
          books.map((book) => (
            <Card
              key={book._id} //helps to react identify which items have changed, are added, or are removed
              book={book} //passes book data to card component as props
            />
          ))}
      </div>
    </>
  );
}
export default Home;
