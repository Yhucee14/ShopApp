import React from "react";

const Rating = ({ rating = 0, total = 5 }) => {
  // Ensure rating is within valid bounds
  const validRating = Math.max(0, Math.min(total, Math.round(rating)));
  const filledStars = validRating; // Number of filled stars
  const emptyStars = total - filledStars; // Number of empty stars

  return (
    <div className="flex items-center text-yellow-600 space-x-1">
      {Array(filledStars)
        .fill(null)
        .map((_, index) => (
          <span key={`filled-${index}`} className="text-lg">
            ★
          </span>
        ))}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <span key={`empty-${index}`} className="text-lg text-gray-400">
            ☆
          </span>
        ))}
    </div>
  );
};

export default Rating;
