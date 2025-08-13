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
  const [visibleItems, setVisibleItems] = useState<number>(0);
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

  useEffect(() => {
    if (isActive) {
      setVisibleItems(0);
      const timers = service.subservices?.map((_, index) =>
        setTimeout(() => setVisibleItems((prev) => prev + 1), 800 + index * 120)
      );
      return () => timers.forEach((timer) => clearTimeout(timer));
    } else {
      setVisibleItems(0);
    }

    console.log("subservices", service.subservices);
  }, [isActive, service.subservices]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

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