import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    productId: string
}

export interface IReviewSentResponse {
    message: string;
}