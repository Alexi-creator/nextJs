import React from 'react';
import { SortEnum, SortProps } from "./Sort.props";
import cn from 'classnames';
import styles from "./Sort.module.css";
import SortIcon from './sort.svg';

export const Sort = ({
  sort, setSort, className, ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} /> По рейтингу
      </span>
      <span
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon} /> По цене
      </span>
    </div>
  );
};