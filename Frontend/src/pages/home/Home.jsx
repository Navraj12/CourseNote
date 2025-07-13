import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/book");
      if (response.status === 200) {
        // Verify the correct response structure first!
        setBooks(response.data.data); // or response.data
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
              key={book._id} // Use a unique identifier from your book data
              book={book} // Pass the entire book object as a prop
            />
          ))}
      </div>
    </>
  );
}
export default Home;
