import React from "react";
import { Button, Htag, Ptag, Tag } from "../components";

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">Text</Htag>
      <Button appearance="primary" arrow="down" className="new class">
        Button
      </Button>
      <Button appearance="primary" className="new class">
        Button
      </Button>
      <Button appearance="ghost" arrow="right">
        Button
      </Button>
      <Ptag size="m">Параграф</Ptag>
      <Tag>Tag</Tag>
      <Tag href="www.site.com" color="red">Tag2</Tag>
    </div>
  );
}
