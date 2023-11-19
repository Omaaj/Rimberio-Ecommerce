import React, { useEffect, useState, useCallback } from 'react';
import "./Clock.css";

export default function Clock({ time }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [offerAvailable, setOfferAvailable] = useState(true);

  const countDown = useCallback(() => {
    const destination = isNaN(new Date(time).getTime()) ? 0 : new Date(time).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        clearInterval(interval);
        setOfferAvailable(false);
        return;
      }

      const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }, 1000);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    countDown();
  }, [countDown]);

  return (
    <div className='clocks'>
      <div className="package">
        {offerAvailable ? (
          <>
            <div className="weeks">
              <h4>{days}</h4>
              <p>Days</p>
            </div>
            <span>:</span>
            <div className="weeks">
              <h4>{hours}</h4>
              <p>Hours</p>
            </div>
            <span>:</span>
            <div className="weeks">
              <h4>{minutes}</h4>
              <p>Minutes</p>
            </div>
            <span>:</span>
            <div className="weeks">
              <h4>{seconds}</h4>
              <p>Seconds</p>
            </div>
          </>
        ) : (
          <p>Offer No Longer Available...</p>
        )}
      </div>
    </div>
  );
}
