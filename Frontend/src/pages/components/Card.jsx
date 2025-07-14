import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Fixed import

const Card = ({ book }) => {
  // const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-10">
      <img
        className="w-full h-48 object-cover"
        src={
          book.imageUrl ||
          "https://mockups-design.com/wp-content/uploads/2023/02/Free_Book_Mockup_1-scaled.jpg"
        }
        alt={`Cover for ${book.bookName}`}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.bookName}</div>
        <p className="text-gray-700 text-base">Rs.{book.bookPrice}</p>
        <p className="text-black-700 text-base">{book.isbnNumber}</p>

        <Link
          to={`/book/${book._id}`}
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          See More
        </Link>

        {/* using navigate function  */}
        {/* <button onClick={() => navigate("/book")}>See More</button> */}
      </div>

      {/* Card Tags */}
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span> */}
      {/* </div> */}
    </div>
  );
};
Card.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    bookName: PropTypes.string.isRequired,
    bookPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    isbnNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default Card;
