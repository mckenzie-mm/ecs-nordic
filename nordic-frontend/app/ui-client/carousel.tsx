"use client"

import { useEffect, useState } from "react";

const { 
  CAROUSEL_IMG_ARR, 
  CAROUSEL_INTERVAL, 
  BRAND, 
  CAROUSEL_INIT_STATE,
  BRAND_WIDTH,
  BRAND_LEFT,
  BRAND_MARGIN_LEFT,
  BRAND_TOP 
} = require("../templates");

const LEN = CAROUSEL_IMG_ARR.length;

export default function Carousel() {
  // when the state changes, the component will re-render
  const [count, setState] = useState<number>(CAROUSEL_INIT_STATE);

  useEffect(() => {
    const id = setInterval(() => setState((c) => (c + 1) % LEN), CAROUSEL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">  
      <div style={{
          position: "absolute",
          width: BRAND_WIDTH,
          left: BRAND_LEFT,
          marginLeft: BRAND_MARGIN_LEFT,
          top: BRAND_TOP,
          zIndex: 1000,
      }}>
        <img className="overlay-img" src={BRAND} alt="brand" />
      </div>  
      <ul className="marker-dots"> 
        {
          CAROUSEL_IMG_ARR.map((_: string, idx: number) => {
            const state = (idx === count) ? "marker-active" : "";
            return <li key={idx} className={state}><button>{idx}</button></li>;
          })
        }
      </ul> 
      <div className="image-wrap"> 
        {
          CAROUSEL_IMG_ARR.map((src: string, idx: number) => {
            const state = (idx === count) ? "image active" : "image inactive";
            return <img key={idx} className={state} src={src} alt="carousel image" />;
          })
        }
      </div> 
    </div> 
  );
}


