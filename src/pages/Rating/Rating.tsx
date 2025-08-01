import React, { useState } from "react";
import "./Rating.css";

type Review = {
  stars: number;
  message: string;
};

function Rating() {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [touched, setTouched] = useState({ stars: false, message: false });

  const isValid = stars > 0 && message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const newReview: Review = { stars, message: message.trim() };
    setReviews([...reviews, newReview]);

    setStars(0);
    setHover(0);
    setMessage("");
    setTouched({ stars: false, message: false });
  };

  return (
    <div className="rating-component">
      <h2>Ostavite svoju ocjenu</h2>
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                (hover || stars) >= star ? "filled" : "empty"
              }`}
              onClick={() => {
                setStars(star);
                setTouched((prev) => ({ ...prev, stars: true }));
              }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              role="button"
              aria-label={`${star} star`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setStars(star);
                  setTouched((prev) => ({ ...prev, stars: true }));
                }
              }}
            >
              ★
            </span>
          ))}
        </div>
        {touched.stars && stars === 0 && (
          <div className="error">Ocjena je obavezna</div>
        )}

        <textarea
          placeholder="Vaš komentar..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setTouched((prev) => ({ ...prev, message: true }));
          }}
          rows={3}
        />
        {touched.message && message.trim() === "" && (
          <div className="error">Komentar je obavezan</div>
        )}

        <button type="submit" disabled={!isValid}>
          Pošalji
        </button>
      </form>

      {reviews.length > 0 && (
        <div className="review-list">
          <h3>Komentari korisnika</h3>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      review.stars >= star ? "filled" : "empty"
                    }`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{review.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rating;
