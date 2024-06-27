import React from "react";
import "./index.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="App">
      <h1 className="text-red-500">Hello World</h1>
      <Button variant={"destructive"} size={"sm"}>
        Halo
      </Button>
    </div>
  );
}

export default App;
