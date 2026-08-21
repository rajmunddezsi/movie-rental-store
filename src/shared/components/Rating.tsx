import { useState } from "react";

type RatingProps = {
  onMutate: (rating: number) => void;
  isPending: boolean;
};

const Rating = ({ onMutate, isPending }: RatingProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (star) => {
    setRating(star);
    onMutate(rating);
  };

  return (
    <div className="text-center z-10 relative text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          disabled={isPending}
          key={star}
          className={star <= rating ? "text-yellow-400" : ""}
          onClick={() => handleRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;
