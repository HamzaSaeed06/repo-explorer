import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TopBanner = () => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 14, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) return { hours: 0, minutes: 0, seconds: 0 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="bg-foreground text-primary-foreground text-xs sm:text-sm py-2 px-4 text-center relative">
      <span>
        New season coming! Discount 10% for all product! Checkout Now!{" "}
        <span className="inline-flex items-center gap-1 ml-2 bg-primary-foreground/20 px-2 py-0.5 rounded text-xs font-mono">
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TopBanner;
