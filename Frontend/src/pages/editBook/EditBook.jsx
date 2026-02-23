import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    publishedAt: "",
    authorName: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("bookName", data.bookName);
    formData.append("bookPrice", data.bookPrice);
    formData.append("isbnNumber", data.isbnNumber);
    formData.append("publishedAt", data.publishedAt);
    formData.append("authorName", data.authorName);
    formData.append("image", image);

    try {
      const response = await axios.patch(
        "https://project1-1-3wxp.onrender.com/book" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        navigate(`/book/${id}`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      alert("An error occurred while creating the book.");
    }
  };

  const fetchBook = async () => {
    const response = await axios.get(
      "https://project1-1-3wxp.onrender.com/book/" + id,
    );
    if (response.status === 200) {
      setData(response.data.data);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl">Edit Book</p>
              <form
                className="flex flex-col pt-3 md:pt-8"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col pt-4">
                  <label htmlFor="bookName" className="text-lg">
                    Book Name
                  </label>
                  <input
                    type="text"
                    id="bookName"
                    value={data.bookName}
                    name="bookName"
                    placeholder="Name of book"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="bookPrice" className="text-lg">
                    Book Price
                  </label>
                  <input
                    type="number"
                    id="bookPrice"
                    value={data.bookPrice}
                    name="bookPrice"
                    placeholder="Book Price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="isbnNumber" className="text-lg">
                    ISBN Number
                  </label>
                  <input
                    type="number"
                    id="isbnNumber"
                    value={data.isbnNumber}
                    name="isbnNumber"
                    placeholder="ISBN Number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="author" className="text-lg">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={data.authorName}
                    name="authorName"
                    placeholder="Author Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="publishedAt" className="text-lg">
                    Published At
                  </label>
                  <input
                    type="date"
                    id="publishedAt"
                    value={data.publishedAt}
                    name="publishedAt" // Match the key in the `data` state object
                    placeholder="Published At"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label htmlFor="image" className="text-lg">
                    Book Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image" // Match the backend field name
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setImage(e.target.files[0])}
                    alt="Book Image"
                  />
                </div>
                <input
                  type="submit"
                  value="Edit Book"
                  className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBook;
