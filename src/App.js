import React from "react";
import objs from "./Data/data";
import Games from "./Games";
import './Css/style.css';

function App() {
  const cate = ['All','Open World', 'Adventure','Rpg','Racing']
  return(
    <Games nav={cate} objs={objs}/>
  )
}

export default App;
