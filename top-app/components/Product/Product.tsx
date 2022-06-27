import React, {
  ForwardedRef,
  forwardRef,
  useRef,
  useState,
} from "react";
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
import { motion } from "framer-motion";

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visiable: {
          height: "auto",
          opacity: 1,
        },
        hidden: { opacity: 0, height: 0 },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={cn(styles.product, className)}>
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
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
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
              <a
                href="#ref"
                onClick={scrollToReview}
              >
                {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
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
              <Button
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial={"hidden"}
            animate={isReviewOpened ? "visiable" : "hidden"}
          >
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
