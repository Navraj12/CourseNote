import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null); // Start with null to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://project1-1-3wxp.onrender.com/book/${id}`
        );
        if (response.status === 200) {
          setBook(response.data.data); // Assuming response.data.data contains the book details
          console.log("Image URL:", response.data.data.imageUrl);
        } else {
          setError("Failed to fetch book details.");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("An error occurred while fetching book details.");
      }
    };

    if (id) {
      fetchBook(); // Call the function only if `id` is valid
    } else {
      setError("Invalid book ID.");
    }
  }, [id]); // Only 'id' in dependency array

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  if (!book) {
    // Loading state until book is fetched
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">
          <p>Loading book details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-10 mx-auto">
        <img
          className="w-full"
          src={book.imageUrl}
          alt={book.bookName || "Book Image"} // Fallback alt text
        />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{book.bookName}</div>
          <p className="text-gray-700 text-base">RS. {book.bookPrice}</p>
          <p className="text-black-700 text-base">Author: {book.authorName}</p>
          <p className="text-black-700 text-base">
            Published At: {new Date(book.publishedAt).toLocaleDateString()}
          </p>
          <button className="bg-blue-300 p-2">Delete</button>
          <Link to={`/editBook/${book._id}`}>
            <button className="bg-blue-300 p-2"> Edit</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
