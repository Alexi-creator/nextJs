import React, { useEffect, useState } from "react";
import { Button, Htag, Ptag, Tag } from "../components";

export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log('counter', counter);
    return function cleanup() {
      console.log('unmount');
    };
  }, []);

  return (
    <div>
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
    </div>
  );
}
