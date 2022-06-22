import React, { useState } from "react";
import { ProductProps } from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceRu } from "../../helpers/helpres";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <>
      <Card
        className={cn(styles.product, className)}
        // {...props}
      >
        <div className={styles.logo}>
          <Image
            src={
              product.image.includes("cdn")
                ? product.image
                : process.env.NEXT_PUBLIC_DOMAIN + product.image
            }
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldprice && (
            <Tag className={styles.oldPrice} color="green">
              {priceRu(product.price - product.oldprice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} color="ghost" className={styles.category}>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>в кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount}&nbsp;
          {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div key={c.name} className={styles.characteristics}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots} />
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          {product.reviews.length > 0 && (
            <Button
              onClick={() => setIsReviewOpened(!isReviewOpened)}
              appearance="ghost"
              arrow={isReviewOpened ? "down" : "right"}
              className={styles.reviewButton}
            >
              Читать отзывы
            </Button>
          )}
        </div>
      </Card>
      <Card
        color="blue"
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map((r) => (
          <>
            <Review key={r._id} review={r} />
            <Divider />
          </>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </>
  );
};
