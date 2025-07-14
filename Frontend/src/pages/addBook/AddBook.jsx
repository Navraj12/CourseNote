import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddBook() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    publishedAt: "",
    author: "", // Match the backend field name
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
    formData.append("authorName", data.author); // Match the backend field name
    formData.append("image", image); // Append the file

    try {
      const response = await axios.post(
        "https://project1-1-3wxp.onrender.com/book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      alert("An error occurred while creating the book.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-3xl">Add Book</p>
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
                    name="bookName" // Match the key in the `data` state object
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
                    name="bookPrice" // Match the key in the `data` state object
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
                    name="isbnNumber" // Match the key in the `data` state object
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
                    name="author" // Match the key in the `data` state object
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
                  value="Add Book"
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

export default AddBook;

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// function AddBook() {
//   //   const [bookName, setBookName] = useState("");
//   //   const [bookPrice, setBookPrice] = useState("");
//   //   const [isbnNumber, setIsbnNumber] = useState("");
//   //   const [publishedAt, setPublishedAt] = useState("");
//   //   const [image, setImage] = useState(null);
//   //   const [author, setAuthor] = useState("");
//   //   const [error, setError] = useState("");

//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();

//   //     // Validate all fields
//   //     if (
//   //       !bookName ||
//   //       !bookPrice ||
//   //       !isbnNumber ||
//   //       !publishedAt ||
//   //       !author ||
//   //       !image
//   //     ) {
//   //       setError("Please fill in all fields.");
//   //       return;
//   //     }

//   //     // Create FormData object for file upload
//   //     const formData = new FormData();
//   //     formData.append("bookName", bookName);
//   //     formData.append("bookPrice", bookPrice);
//   //     formData.append("isbnNumber", isbnNumber);
//   //     formData.append("publishedAt", publishedAt);
//   //     formData.append("authorName", author);
//   //     formData.append("image", image); // Append the file

//   //     try {
//   //       console.log("Submitting form data...");
//   //       const response = await axios.post(
//   //         "http://localhost:3000/book",
//   //         formData,
//   //         {
//   //           headers: {
//   //             "Content-Type": "multipart/form-data", // Set the correct content type
//   //           },
//   //         }
//   //       );

//   //       console.log("Response received:", response);

//   //       if (response.status === 201) {
//   //         alert("Book created successfully!");
//   //         // Reset form fields
//   //         setBookName("");
//   //         setBookPrice("");
//   //         setIsbnNumber("");
//   //         setPublishedAt("");
//   //         setAuthor("");
//   //         setImage(null);
//   //         setError("");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error creating book:", error);
//   //       if (error.response) {
//   //         console.error("Server response:", error.response.data);
//   //         setError(
//   //           error.response.data.message ||
//   //             "An error occurred while creating the book."
//   //         );
//   //       } else if (error.request) {
//   //         console.error("No response received:", error.request);
//   //         setError("Network error. Please try again.");
//   //       } else {
//   //         console.error("Error:", error.message);
//   //         setError("An unexpected error occurred.");
//   //       }
//   //     }
//   //  };

//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     bookName: "",
//     bookPrice: "",
//     isbnNumber: "",
//     publishedAt: "",
//     author: "",
//   });
//   const [image, setImage] = useState(null);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     formData.append("image", image);
//     const response = await axios.post("http://localhost:3000/book", formData);
//     if (response.status === 201) {
//       navigate("/");
//     } else {
//       alert("something went wrong");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="bg-white font-family-karla h-screen">
//         <div className="w-full flex flex-wrap">
//           <div className="w-full md:w-1/2 flex flex-col">
//             <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
//               <p className="text-center text-3xl">Add Book</p>
//               <p className="text-red-500 text-center"></p>
//               <form
//                 className="flex flex-col pt-3 md:pt-8"
//                 onSubmit={handleSubmit}
//               >
//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="bookName" className="text-lg">
//                     Book Name
//                   </label>
//                   <input
//                     type="text"
//                     id="bookName"
//                     placeholder="Name of book"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     // value={bookName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="bookPrice" className="text-lg">
//                     Book Price
//                   </label>
//                   <input
//                     type="number"
//                     id="bookPrice"
//                     placeholder="Book Price"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     // value={bookPrice}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="isbnNumber" className="text-lg">
//                     ISBN Number
//                   </label>
//                   <input
//                     type="number"
//                     id="isbnNumber"
//                     placeholder="ISBN Number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     // value={isbnNumber}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="authorName" className="text-lg">
//                     Author Name
//                   </label>
//                   <input
//                     type="text"
//                     id="authorName"
//                     placeholder="Author Name"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     // value={author}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="publishedAt" className="text-lg">
//                     Published At
//                   </label>
//                   <input
//                     type="date"
//                     id="publishedAt"
//                     placeholder="Published At"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     // value={publishedAt}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="flex flex-col pt-4">
//                   <label htmlFor="bookImage" className="text-lg">
//                     Book Image
//                   </label>
//                   <input
//                     type="file"
//                     id="image"
//                     placeholder="Book Image"
//                     name="image"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     onChange={(e) => setImage(e.target.files[0])}
//                     alt="Book Image"
//                   />
//                 </div>

//                 <input
//                   type="submit"
//                   value="Add Book"
//                   className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddBook;
