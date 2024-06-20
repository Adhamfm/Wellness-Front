import React, { useState } from "react";
import { StarRatingDiv } from "./StarRatingStyles";

export default function StarRating(props) {
  const [rating, setRating] = useState(props.value);
  const [hover, setHover] = useState(null);

  const handleChange = () => {
    props.onValueChange(rating);
  }


  return (
    <StarRatingDiv>
      {[...Array(5)].map((Star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                props.onValueChange(ratingValue)
                setRating(ratingValue);
              }}
            />
            <star
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              className={
                ratingValue <= (hover || rating) ? "activeStar" : "star"
              }
            ></star>
          </label>
        );
      })}
    </StarRatingDiv>
  );
}
