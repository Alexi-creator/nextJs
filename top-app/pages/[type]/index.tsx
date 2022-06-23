import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";
import { firstLevelMenu } from "../../helpers/helpres";
import { MenuItem } from "../../interfaces/menu.interface";
import { withLayout } from "../../layout/Layout";

function Type({ firstCategory }: TypeProps): JSX.Element {
    return (
        <>
            type: {firstCategory}
        </>
    );
}

// HOC шаблона куда прокидываем компонент который нужно отразить на странице
export default withLayout(Type);


// передаем все возможные пути для генерации страниц
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => '/' + m.route),
    fallback: true,
  };
};

// получаем из запроса данные для страницы
export const getStaticProps: GetStaticProps<TypeProps> = async ({
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

  const { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find,
    {
      firstCategory: firstCategoryItem.id,
    }
  );
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}