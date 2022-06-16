import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpres";
import { TopPageComponents } from '../../page-components';

function TopPage({ page, products, firstCategory }: TopPageProps): JSX.Element {
    return <TopPageComponents
        page={page}
        products={products}
        firstCategory={firstCategory}
    />;
}

// HOC шаблона куда прокидываем компонент который нужно отразить на странице
export default withLayout(TopPage);

// передаем все возможные пути для генерации страниц
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      {
        firstCategory: m.id,
      }
    );
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  return {
    paths,
    fallback: true,
  };
};

// ф-я next которой нужно передать данные для страницы, предварительно их получаем по API
export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  // если нет параметров в строке то будет возвращаться 404 страница
  if (!params) {
    return {
      notFound: true,
    };
  }

  // проходим по нашему меню и вытаскиваем тот путь который совпадает с строкой из бразура
  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  // проверка для запросов если будет ошибка то возвращаем 404 страницу
  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      {
        firstCategory: firstCategoryItem.id,
      }
    );

    // если меню пустое то так же 404 страницу возвращаем
    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    // для получения данных в запросе используем params которые передан в ф-ии getStaticProps
    const { data: page } = await axios.get<TopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
    );

    const { data: products } = await axios.post<ProductModel[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
      {
        category: page.category,
        limit: 10,
      }
    );

    // возвращаем данные которые теперь можно взять в компоненте для этой страницы
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
