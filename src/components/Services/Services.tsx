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
  const [visibleItems, setVisibleItems] = useState<number>(0);
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

  // Animate price items
  useEffect(() => {
    if (isActive) {
      setVisibleItems(0);
      const timers = priceItems.map((_, index) =>
        setTimeout(() => setVisibleItems((prev) => prev + 1), 800 + index * 120)
      );
      return () => timers.forEach((timer) => clearTimeout(timer));
    } else {
      setVisibleItems(0);
    }
  }, [isActive, priceItems]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

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
            {priceItems.slice(0, visibleItems).map((item, index) => (
              <React.Fragment key={index}>
                <div className="area">{item.area}</div>
                <div className="price">{item.price}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
