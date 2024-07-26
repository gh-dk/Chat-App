import React from "react";
import "./css/bigprofile.css";

export function Bigprofile() {
  const handleBigBoxClose = () => {
    document.getElementById("bigimagebox").style.display = "none";
  };

  return (
    <div className="bigimagebox" onClick={handleBigBoxClose} id="bigimagebox">
      <img
        onClick={(e) => {
          e.stopPropagation();
        }}
        id="bigimage"
        src=""
      />
    </div>
  );
}

export function setBigImage(url) {
  document.getElementById("bigimagebox").style.display = "flex";
  document.getElementById("bigimage").src = url;
}
