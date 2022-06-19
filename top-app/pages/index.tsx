import { GetStaticProps } from "next";
import React, { useState } from "react";
import {
  Button,
  Htag,
  Ptag,
  Tag,
  Rating,
  Input,
  Textarea,
} from "../components";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";

function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Rating rating={rating} isEditable setRating={setRating} />
      {counter}
      <Htag tag="h1">Text</Htag>
      <Button
        appearance="primary"
        arrow="down"
        className="new class"
        onClick={() => setCounter((x) => x + 1)}
      >
        Button Counter
      </Button>
      <Button appearance="primary" className="new class">
        Button
      </Button>
      <Button appearance="ghost" arrow="right">
        Button
      </Button>
      <Ptag size="m">Параграф</Ptag>
      <Tag>Tag</Tag>
      <Tag href="www.site.com" color="red">
        Tag2
      </Tag>
      <Input placeholder="Имя" />
      <Textarea placeholder="textarea" rows={3} />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}