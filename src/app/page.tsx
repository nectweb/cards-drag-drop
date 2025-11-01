"use client";
import GridLayout, { Layout } from "react-grid-layout";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface MyLayout extends Layout {
  img: string;
  name: string;
  url: string;
  effectLeft: boolean;
}

export default function Home() {
  const lastX = useRef<number | null>(null);

  const initialLayout: MyLayout[] = [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      img: "github.png",
      name: "Github",
      url: "https://github.com/dbrito1992",
      effectLeft: false,
    },
    {
      i: "b",
      x: 1,
      y: 0,
      w: 1,
      h: 2,
      img: "facebook.jpg",
      name: "Facebook",
      url: "https://facebook.com/nectweb",
      effectLeft: false,
    },
    {
      i: "c",
      x: 2,
      y: 0,
      w: 1,
      h: 2,
      img: "instagram.jpg",
      name: "Instagram",
      url: "https://instagram.com/nectweb",
      effectLeft: false,
    },
    {
      i: "d",
      x: 3,
      y: 0,
      w: 1,
      h: 2,
      img: "youtube.jpg",
      name: "Youtube",
      url: "https://youtube.com/@nectweb",
      effectLeft: false,
    },
    {
      i: "e",
      x: 0,
      y: 2,
      w: 1,
      h: 2,
      img: "xcom.jpg",
      name: "X.com",
      url: "https://x.com/nectweb",
      effectLeft: false,
    },
    {
      i: "f",
      x: 1,
      y: 2,
      w: 1,
      h: 2,
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

   const handleDrag = (layout: MyLayout[], oldItem: Layout, newItem: Layout) => {
    if (lastX.current !== null) {
      if (newItem.x > lastX.current) {
        console.log(`${newItem.i} movendo para a direita`);
      } else if (newItem.x < lastX.current) {
        console.log(`${newItem.i} movendo para a esquerda`);
      }
    }
    lastX.current = newItem.x;
  };

  const handleDragStart = () => {
    lastX.current = null; // reseta ao começar o drag
  };

  const handleDragStop = () => {
    lastX.current = null; // reseta ao soltar o card
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      margin={[24, 34]}
      cols={4}
      rowHeight={94}
      isResizable={false}
      width={924}
      isDraggable={true}
      compactType="vertical"
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
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
                    "--sizeW": "10px",
                    "--sizeH": "10px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 1, 2)}
              >
                1X2
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "10px",
                    "--sizeH": "25px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 1, 4)}
              >
                1X4
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "20px",
                    "--sizeH": "20px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 2, 2)}
              >
                2X2
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
                onClick={() => handleSize(itens.i, 4, 4)}
              >
                4X4
              </button>
            </div>
            <div className="btn-size">
              <button
                style={
                  {
                    "--sizeW": "30px",
                    "--sizeH": "10px",
                  } as React.CSSProperties
                }
                onClick={() => handleSize(itens.i, 4, 2)}
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
