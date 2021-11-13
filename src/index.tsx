import "./style.css";

import React from "react";

import ReactDOM from "react-dom";

ReactDOM.render(
  <React.Fragment>
    <div className="flex flex-1 justify-center items-center bg-purple-100">
      <div className="transition-all duration-700 hover:shadow-lg hover:bg-purple-500 p-12 rounded-xl group cursor-pointer">
        <h1 className="transition-all duration-700 text-purple-500 group-hover:text-white text-5xl font-bold">
          Hi, I am Ananya.
        </h1>
      </div>
    </div>
  </React.Fragment>,
  document.getElementById("root"),
);
