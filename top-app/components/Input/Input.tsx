import React, { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css";

// forwardRef ф-я которая принимает ф-ию компонент для прокидываения ref на элемент дома

export const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={styles.inputWrapper}>
        <input className={cn(className, styles.input, {
          [styles.error]: error
        })} ref={ref} {...props} />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
