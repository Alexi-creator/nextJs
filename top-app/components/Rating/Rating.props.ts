import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isEditable?: false
    rating: number
    setRating?: (rating: number) => void;
}