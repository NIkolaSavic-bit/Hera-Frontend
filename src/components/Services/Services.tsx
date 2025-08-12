import React, { useState, useEffect, useRef } from "react";
import "./Services.css";

interface PriceItem {
  area: string;
  price: string;
}

interface ServiceCardProps {
  imagePath: string;
  title: string;
  description: string;
  priceItems: PriceItem[];
  badges?: string[];
  isActive?: boolean;
  isInactive?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const Services: React.FC<ServiceCardProps> = ({
  imagePath,
  title,
  description,
  priceItems,
  badges,
  isActive,
  isInactive,
  onClick,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    if (!isActive || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onClose]);

  // Constants for layout
  const itemsPerColumn = 4;
  const columnsCount = Math.ceil(priceItems.length / itemsPerColumn);

  // Group priceItems into columns (each column has up to itemsPerColumn items)
  const groupedColumns: PriceItem[][] = [];

  for (let col = 0; col < columnsCount; col++) {
    const columnItems: PriceItem[] = [];
    for (let row = 0; row < itemsPerColumn; row++) {
      // Calculate item index in the original list
      const itemIndex = row * columnsCount + col;
      if (priceItems[itemIndex]) {
        columnItems.push(priceItems[itemIndex]);
      }
    }
    groupedColumns.push(columnItems);
  }

  const itemsPerRow = 4;
  const rowsCount = Math.ceil(priceItems.length / itemsPerRow);

  const groupedRows: PriceItem[][] = [];

  for (let row = 0; row < rowsCount; row++) {
    const rowItems = priceItems.slice(
      row * itemsPerRow,
      (row + 1) * itemsPerRow
    );
    groupedRows.push(rowItems);
  }
  // State to control how many rows are visible
  const [visibleRows, setVisibleRows] = useState<number>(0);

  // Animate showing rows one by one
  useEffect(() => {
    if (isActive) {
      setVisibleRows(0);
      const timers = groupedRows.map((_, i) =>
        setTimeout(() => {
          setVisibleRows(i+1);
        }, i * 200)
      );
      return () => timers.forEach((t) => clearTimeout(t));
    } else {
      setVisibleRows(0);
    }
  }, [isActive, priceItems]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  // Scroll adjustment when active
  useEffect(() => {
    if (!isActive || !cardRef.current) return;

    const prevTop = cardRef.current.getBoundingClientRect().top;
    const prevScrollY = window.scrollY;

    const timeout = setTimeout(() => {
      const newTop = cardRef.current!.getBoundingClientRect().top;
      const diff = newTop - prevTop;

      window.scrollTo({
        top: prevScrollY + diff,
        behavior: "auto",
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className={`service-card ${isActive ? "active" : ""} ${
        isInactive ? "inactive" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="service-card-inner" ref={contentRef}>
        {badges?.includes("most-popular") && (
          <div className="most-popular">Most Popular</div>
        )}
        <img src={imagePath} alt={title} className="service-card-image" />
        <div className="service-card-content">
          <h2 className="service-card-title">{title}</h2>
          <p className="service-card-description">{description}</p>
          <div className="price-table">
            {groupedRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="price-row fade-in-row"
                style={{
                  animationDelay: `${rowIndex * 0.5}s`,
                  display: rowIndex < visibleRows ? "grid" : "none",
                }}
              >
                {row.map((item, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <div className="area">{item.area}</div>
                    <div className="price">{item.price}</div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
