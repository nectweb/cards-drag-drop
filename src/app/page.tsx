"use client";
import GridLayout, { Layout } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface MyLayout extends Layout {
  img: string;
  name: string;
  url: string;
  effectLeft: boolean;
}

export default function Home() {
  const initialLayout: MyLayout[] = [
    { i: "a", x: 0, y: 0, w: 0.933, h: 1.71, img: "github.png", name: "Github", url: "https://github.com/dbrito1992", effectLeft: false },
    { i: "b", x: 1, y: 0, w: 0.933, h: 1.71, img: "facebook.jpg", name: "Facebook", url: "https://facebook.com/nectweb", effectLeft: false },
    { i: "c", x: 2, y: 0, w: 0.933, h: 1.71, img: "instagram.jpg", name: "Instagram", url: "https://instagram.com/nectweb", effectLeft: false },
    { i: "d", x: 3, y: 0, w: 0.933, h: 1.71, img: "youtube.jpg", name: "Youtube", url: "https://youtube.com/@nectweb", effectLeft: false },
    { i: "e", x: 0, y: 2, w: 0.933, h: 1.71, img: "xcom.jpg", name: "X.com", url: "https://x.com/nectweb", effectLeft: false },
    { i: "f", x: 1, y: 2, w: 0.933, h: 1.71, img: "next-js.svg", name: "Next.js", url: "https://nextjs.org", effectLeft: false },
  ];

  const [layout, setLayout] = useState<MyLayout[]>(initialLayout);
  const [movingDir, setMovingDir] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const prevPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHeldStill, setIsHeldStill] = useState(false);
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSize = (id: string, w: number, h: number) => {
    setLayout((prev) => prev.map((item) => (item.i === id ? { ...item, w, h } : item)));
  };

  const handleDelete = (id: string) => {
    setLayout((prev) => prev.filter((item) => item.i !== id));
  };

  const handleDragStart = (layout: Layout[], oldItem: Layout) => {
    setActiveItem(oldItem.i);
    prevPos.current = { x: oldItem.x, y: oldItem.y };
  };

  const handleDrag = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    setIsDragging(true);
    setIsHeldStill(false);

    const dx = newItem.x - prevPos.current.x;
    const dy = newItem.y - prevPos.current.y;

    // define a direção horizontal
    if (Math.abs(dx) > Math.abs(dy)) {
      setMovingDir(dx > 0 ? "right" : "left");
    }

    // Se parar de mover por 100ms, considera "parado segurando"
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
    dragTimeout.current = setTimeout(() => {
      setIsHeldStill(true);
    }, 50);

    prevPos.current = { x: newItem.x, y: newItem.y };
  };

  const handleDragStop = () => {
    setMovingDir("stop");
    setIsDragging(false);
    setIsHeldStill(false);
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
  };

  useEffect(() => {
    if (isHeldStill) setMovingDir("reset");
  }, [isHeldStill]);

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
      onLayoutChange={(newLayout) =>
        setLayout((prev) =>
          prev.map((item) => {
            const updated = newLayout.find((nl) => nl.i === item.i);
            return updated ? { ...item, x: updated.x, y: updated.y, w: updated.w, h: updated.h } : item;
          })
        )
      }
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      isBounded={true}
    >
      {layout.map((itens) => {
        const isActive = activeItem === itens.i;
        return (
          <div key={itens.i} className="cards">
            <div
              className="card-inner"
              style={{
                transform:
                  isActive && movingDir === "right"
                    ? "rotate(-6deg)"
                    : isActive && movingDir === "left"
                    ? "rotate(6deg)"
                    : "rotate(0deg)",
                transformOrigin: "center center",
                transition: isDragging ? "transform 0.3s ease" : "transform 0.3s ease",
              }}
            >
              <button className="btn-trash" onClick={() => handleDelete(itens.i)}>
                <FiTrash2 />
              </button>
              <Image src={"/" + itens.img} width={100} height={100} alt={itens.name} />
              <h2>{itens.name}</h2>
              <a href={itens.url} style={{ "--color": "#010101" } as React.CSSProperties}>
                Seguir
              </a>
              <div className="size-container">
                <div className="btn-size">
                  <button style={{ "--sizeW": "15px", "--sizeH": "15px" } as React.CSSProperties} onClick={() => handleSize(itens.i, 0.933, 1.71)}></button>
                </div>
                <div className="btn-size">
                  <button style={{ "--sizeW": "10px", "--sizeH": "20px" } as React.CSSProperties} onClick={() => handleSize(itens.i, 0.933, 3.42)}></button>
                </div>
                <div className="btn-size">
                  <button style={{ "--sizeW": "35px", "--sizeH": "20px" } as React.CSSProperties} onClick={() => handleSize(itens.i, 1.886, 1.71)}></button>
                </div>
                <div className="btn-size">
                  <button style={{ "--sizeW": "25px", "--sizeH": "25px" } as React.CSSProperties} onClick={() => handleSize(itens.i, 1.886, 3.42)}></button>
                </div>
                <div className="btn-size">
                  <button style={{ "--sizeW": "25px", "--sizeH": "10px" } as React.CSSProperties} onClick={() => handleSize(itens.i, 1.886, 0.82)}></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </GridLayout>
  );
}
