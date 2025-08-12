import React, { useState, useEffect, useRef } from "react";
import "./Services.css";
import type { Service } from "../../models/Service/Service";

interface ServiceCardProps {
  imagePath: string;
  service: Service;
  badges?: string[];
  isActive?: boolean;
  isInactive?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const Services: React.FC<ServiceCardProps> = ({
  imagePath,
  service,
  badges,
  isActive,
  isInactive,
  onClick,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isActive) {
      setVisibleItems(0);
      const timers = service.subservices?.map((_, index) =>
        setTimeout(() => setVisibleItems((prev) => prev + 1), 800 + index * 120)

      );
      return () => timers.forEach((t) => clearTimeout(t));
    } else {
      setVisibleRows(0);
    }

    console.log("subservices", service.subservices);
  }, [isActive, service.subservices]);

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

  function formatDuration(duration: string): string {
    const date = new Date(duration);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  }


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
        <img
          src={imagePath}
          alt={service.name}
          className="service-card-image"
        />
        <div className="service-card-content">
          <h2 className="service-card-title">{service.name}</h2>
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

            {service.subservices?.slice(0, visibleItems).map((item, index) => (
              <React.Fragment key={index}>
                  <div className="area">{item.name}</div>
                  <div className="price">{item.price}KM</div>
              </React.Fragment>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
