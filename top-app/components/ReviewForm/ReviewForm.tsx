import React, { useState } from "react";
import { IReviewSentResponse, ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import styles from "./ReviewForm.module.css";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form"; // Controller нужен для работы с управляемыми полями(те у которых от состояния зависит то что отображается в поле)
import { IReviewForm } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // эта самописная ф-и будет принимать данные с формы, т.к. она является аргументом ф-ии handleSubmit от react-hook-form
  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId,
        }
      );

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что то пошло не так...');
      }

    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        {/* { register ф-ия react-hook-form которая добавляет нашему инпуту поля (name итд) } */}
        <Input
          {...register("name", {
            required: { value: true, message: "Зполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          className={styles.inputName}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Зполните заголовок" },
          })}
          placeholder="Заголовок отзыва"
          error={errors.title}
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Rating
                setRating={field.onChange}
                ref={field.ref}
                rating={field.value}
                error={errors.rating}
                isEditable
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Заполните текст отзыва" },
          })}
          placeholder="Текст отзыва"
          error={errors.description}
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon onClick={() => setIsSuccess(false)} className={styles.close} />
      </div>}
      {error && <div className={styles.error}>
        Что-то пошло не так попробуйте обновить страницу
        <CloseIcon onClick={() => setError(undefined)} className={styles.close} />
      </div>}
    </form>
  );
};
