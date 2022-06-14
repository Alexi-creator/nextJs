export interface ProductCharacteristic {
    value: string;
    name: string;
}

export interface ReviewModel {
    _id: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    createdAt: Date;
}

export interface ProductModel {
    _id: string;
    categories: string[];
    tags: string[];
    title: string;
    link: string;
    price: number;
    credit: number;
    oldprice: number;
    description: string;
    characteristic: ProductCharacteristic[];
    createAt: Date;
    updateAt: Date;
    __v: number;
    image: string;
    initialRating: number;
    reviews: ReviewModel[];
    reviewCount: number;
    reviewAvg?: number;
    advantages: string;
}