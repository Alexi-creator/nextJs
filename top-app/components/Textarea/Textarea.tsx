import React, { ForwardedRef, forwardRef } from "react";
import { TextareaProps } from "./Textarea.props";
import cn from "classnames";
import styles from "./Textarea.module.css";

export const Textarea = forwardRef(
  (
    { className, error, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.textAreaWrapper, className)}>
        <textarea
          className={cn(styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
