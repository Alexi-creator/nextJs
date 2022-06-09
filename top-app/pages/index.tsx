import React from "react";
import { Button, Htag } from "../components";

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">Text</Htag>
      <Button appearance="primary" className="new class">Button</Button>
      <Button appearance="ghost" arrow="right">Button</Button>
    </div>
  );
}
