import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "New":
        return "bg-blue-500";
      case "Hot":
        return "bg-red-500";
      case "Sale":
        return "bg-yellow-500";
      default:
        return "";
    }
  };

  // Handle the case when coverImage is an array
  const coverImageSrc =
    Array.isArray(book?.coverImage) && book.coverImage.length > 0
      ? book.coverImage[0] // Take the first image if coverImage is an array
      : book?.coverImage; // Otherwise, use the single URL

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        
        {/* Book Cover Image */}
        <div className="relative sm:h-72 sm:flex-shrink-0 rounded-md">
          {/* Conditional rendering of the tag */}
          {book?.tag !== "None" && (
            <span
              className={`absolute top-0 left-0 px-3 py-1 z-50 text-white font-bold text-s rounded shadow-lg ${getTagColor(book?.tag)}`}
            >
              {book?.tag}
            </span>
          )}
          <Link to={`/books/${book._id}`}>
            <img
              src={coverImageSrc} // Use the image source (either single URL or first in array)
              alt={book?.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Book Information */}
        <div>
          <div className="w-40 h-[4px] bg-primary mb-5"></div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>
          
          {/* Pricing Section */}
          <p className="font-medium mb-5">
            {book?.tag === "Sale" ? (
              <>
                <span className="text-red-600 font-bold ml-2">
                  ₱{book?.discountPrice}
                </span>
                <span className="line-through font-normal ml-2 text-gray-500">
                  ₱{book?.price}
                </span>
              </>
            ) : (
              <>₱{book?.price}</>
            )}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
