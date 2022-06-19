import { withLayout } from "../../layout/Layout";


function Search(): JSX.Element {
  return (
    <>
        Search
    </>
  );
}

// HOC шаблона куда прокидываем компонент который нужно отразить на странице
export default withLayout(Search);



