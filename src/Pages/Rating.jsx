import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating = 0, size = 16 }) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        index < fullStars ? (
          <FaStar
            key={index}
            size={size}
            className="text-yellow-400"
          />
        ) : (
          <FaRegStar
            key={index}
            size={size}
            className="text-gray-300"
          />
        )
      ))}

      <span className="ml-2 text-sm text-gray-500">
        {rating}
      </span>
    </div>
  );
};

export default Rating;
