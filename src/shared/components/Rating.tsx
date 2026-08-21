import { useState } from "react";

type RatingProps = {
  onMutate: () => void;
  isPending: boolean;
};

const Rating = ({ onMutate, isPending }: RatingProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (star: number) => {
    setRating(star);
    onMutate();
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
