import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
  return <>{products && products.length}</>;
}

// HOC шаблона куда прокидываем компонент который нужно отразить на странице
export default withLayout(Course);

// передаем все возможные пути для генерации страниц
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      {
        firstCategory,
      }
    );
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    };
};

// ф-я next которой нужно передать данные для страницы, предварительно их получаем по API
export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  // если нет параметров в строке то вобудет возвращаться 404 страница
  if (!params) {
    return {
        notFound: true
    };
  } 

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );

  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
  );

  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find", {
        category: page.category,
        limit: 10
    }
  );

  // возвращаем данные которые теперь можно взять в компоненте для этой страницы
  return {
    props: {
      menu,
      firstCategory,
      page,
      products,
    },
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
