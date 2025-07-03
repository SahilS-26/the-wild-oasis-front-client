"use client";

import { useEffect, useState, useRef } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const start = () => {
      if (visible) return; // avoid stacking
      setVisible(true);
      setProgress(10);

      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 5 : prev));
      }, 200);
    };

    const finish = () => {
      clearInterval(intervalRef.current);
      setProgress(100);

      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    const handleNavigation = () => {
      start();

      // Wait for render loop or slight delay (simulate navigation)
      requestAnimationFrame(() => {
        setTimeout(finish, 500); // you can adjust this to match actual load behavior
      });
    };

    // Handle normal anchor <a> clicks
    document.body.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (target && target.href && target.target !== "_blank") {
        handleNavigation();
      }
    });

    // Handle back/forward
    window.addEventListener("popstate", handleNavigation);

    // Handle refresh/unload
    window.addEventListener("beforeunload", start);

    // Cleanup
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("beforeunload", start);
    };
  }, [visible]);

  return (
    <div
      className="progress-container"
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
