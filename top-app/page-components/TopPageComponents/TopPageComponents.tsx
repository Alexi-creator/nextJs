import { HhData, Htag, Tag } from "../../components";
import { TopPageComponentsProps } from "./TopPageComponents.props";
import styles from './TopPageComponents.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponents = ({
  page,
  products,
  firstCategory,
}: TopPageComponentsProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1"> {page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>

      <div className={styles.products}>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>

      <div className={styles.hhTitle}>
        <Htag tag="h2"> Вакансии - {page.category}</Htag>
        {products && (
          <Tag color="red" size="m">
            hh.ru
          </Tag>
        )}
      </div>

      {firstCategory === TopLevelCategory.Courses && <HhData {...page.hh} />}
    </div>
  );
};
