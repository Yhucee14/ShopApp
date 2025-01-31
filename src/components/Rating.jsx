import { useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { cilStar, cilStarHalf, cilStar as cilStarOutline } from "@coreui/icons";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => setRating(value);
  const handleMouseEnter = (value) => setHover(value);
  const handleMouseLeave = () => setHover(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fullStar = hover >= star || rating >= star;
        const halfStar = hover >= star - 0.5 || rating >= star - 0.5;

        return (
          <div
            key={star}
            className="relative w-6 h-6 cursor-pointer"
            onMouseLeave={handleMouseLeave}
          >
            {/* Left Half-Star */}
            <CIcon
              icon={halfStar && !fullStar ? cilStarHalf : cilStarOutline}
              className={`absolute left-0 w-6 h-5 ${
                halfStar ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleClick(star - 0.5)}
              onMouseEnter={() => handleMouseEnter(star - 0.5)}
            />
            {/* Right Full-Star */}
            <CIcon
              icon={fullStar ? cilStar : cilStarOutline}
              className={`w-6 h-5 ${
                fullStar ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
