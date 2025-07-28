import React from 'react';
import './Services.css';

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
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imagePath,
  title,
  description,
  priceItems,
}) => {
  return (
    <div className="service-card">
      <img src={imagePath} alt={title} className="service-card-image" />
      <div className="service-card-content">
        <h2 className="service-card-title">{title}</h2>
        <p className="service-card-description">{description}</p>
        <table className="price-table">
          <tbody>
            {priceItems.map((item, index) => (
              <tr key={index}>
                <td className="area">{item.area}</td>
                <td className="price">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceCard;