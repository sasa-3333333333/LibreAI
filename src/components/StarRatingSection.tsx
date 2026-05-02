import type React from "react"
import { useState, useEffect } from "react";

interface StarRatingProps {
    onSelect: (rating: number) => void;
    currentRating: number;
}

const StarRatingSection: React.FC<StarRatingProps> = ({ onSelect, currentRating }) => {
    const [hoverStarsAmount, setHoverStarsAmount] = useState(0);
    const [selectedStarAmount, setSelectedStarAmount] = useState(currentRating);

    useEffect(() => {
        setSelectedStarAmount(currentRating);
    }, [currentRating]);

    return (
        <div className="flex justify-center space-x-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverStarsAmount || selectedStarAmount);

                return (
                    <button
                        key={star}
                        type="button"
                        className={`text-2xl transition-all duration-150 outline-none bg-transparent border-none cursor-pointer ${isFilled ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
                        onMouseEnter={() => setHoverStarsAmount(star)}
                        onMouseLeave={() => setHoverStarsAmount(0)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStarAmount(star);
                            onSelect(star);
                        }}
                    >
                        {isFilled ? '★' : '☆'}
                    </button>
                );
            })}
        </div>
    );
}

export default StarRatingSection;