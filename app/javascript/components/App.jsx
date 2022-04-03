import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";

const App = () => {
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <>
      <div>Hola</div>
      <div>Hola</div>
      <div>Hola</div>
      <div>Hola</div>

      <div>
        <button onClick={decrease}>-</button>
        <span>{count}</span>
        <button onClick={increase}>+</button>
      </div>
    </>
  );
};
export default App;