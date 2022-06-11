import React, { useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import StartIcon from './star.svg';
import cn from 'classnames';
import styles from './Rating.module.css';

export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  
  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <StartIcon className={cn(styles.star, {
          [styles.filled]: i < currentRating
        })} />
      );
    });

    setRatingArray(updateArray);
  };

  return (
    <div {...props}>
      {ratingArray.map((r, i) => {
        return <span key={i}>{r}</span>;
      })}
    </div>
  );
};