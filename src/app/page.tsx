"use client";
import GridLayout, { Layout } from "react-grid-layout";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Image from "next/image";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface MyLayout extends Layout {
  img: string;
  name: string;
  url: string;
  effectLeft: boolean;
}

export default function Home() {
  const initialLayout: MyLayout[] = [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 0.933,
      h: 1.71,
      img: "github.png",
      name: "Github",
      url: "https://github.com/dbrito1992",
      effectLeft: false,
    },
    {
      i: "b",
      x: 1,
      y: 0,
      w: 0.933,
      h: 1.71,
      img: "facebook.jpg",
      name: "Facebook",
      url: "https://facebook.com/nectweb",
      effectLeft: false,
    },
    {
      i: "c",
      x: 2,
      y: 0,
      w: 0.933,
      h: 1.71,
      img: "instagram.jpg",
      name: "Instagram",
      url: "https://instagram.com/nectweb",
      effectLeft: false,
    },
    {
      i: "d",
      x: 3,
      y: 0,
      w: 0.933,
      h: 1.71,
      img: "youtube.jpg",
      name: "Youtube",
      url: "https://youtube.com/@nectweb",
      effectLeft: false,
    },
    {
      i: "e",
      x: 0,
      y: 2,
      w: 0.933,
      h: 1.71,
      img: "xcom.jpg",
      name: "X.com",
      url: "https://x.com/nectweb",
      effectLeft: false,
    },
    {
      i: "f",
      x: 1,
      y: 2,
      w: 0.933,
      h: 1.71,
      img: "next-js.svg",
      name: "Next.js",
      url: "https://nextjs.org",
      effectLeft: false,
    },
  ];
  const [layout, setLayout] = useState<MyLayout[]>(initialLayout);

  const handleSize = (id: string, w: number, h: number) => {
    setLayout((prev) =>
      prev.map((item) =>
        item.i === id
          ? { ...item, w: w, h: h } // aumenta tamanho
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setLayout((prev) => prev.filter((item) => item.i !== id));
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      margin={[24, 24]}
      width={924}
      cols={4}
      rowHeight={100}
      isResizable={false}
      draggableCancel=".btn-trash, a, button"
    >
      {layout.map((itens) => (
        <div
          key={itens.i}
          className="cards"
        >
          <button className="btn-trash" onClick={() => handleDelete(itens.i)}>
            <FiTrash2 />
          </button>
          <Image
            src={"/" + itens.img}
            width={100}
            height={100}
            alt={itens.name}
          />
          <h2>{itens.name}</h2>
          <a
            href={itens.url}
            style={{ "--color": "#010101" } as React.CSSProperties}
          >
            Seguir
          </a>
          <div className="size-container">
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "15px",
                    "--sizeH": "15px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 0.933, 1.71)}
              >
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "10px",
                    "--sizeH": "20px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 0.933, 3.42)}
              >
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "35px",
                    "--sizeH": "20px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 1.886, 1.71)}
              >
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "25px",
                    "--sizeH": "25px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 1.886, 3.42)}
              >
                400X400
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "25px",
                    "--sizeH": "10px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 1.886, 0.82)}
              >
                4X2
              </button>
            </div>
          </div>
        </div>
      ))}
    </GridLayout>
  );
}
