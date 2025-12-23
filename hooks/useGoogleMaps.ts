import { useState, useEffect } from "react";

// Global state to track Google Maps loading
let googleMapsPromise: Promise<void> | null = null;
let isLoaded = false;

export const useGoogleMaps = () => {
  const [loaded, setLoaded] = useState(isLoaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already loaded, just update state
    if (isLoaded) {
      setLoaded(true);
      return;
    }

    // If currently loading, wait for the promise
    if (googleMapsPromise) {
      googleMapsPromise
        .then(() => {
          isLoaded = true;
          setLoaded(true);
        })
        .catch((err) => {
          setError(err.message);
        });
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );

    if (existingScript) {
      // Script exists, wait for it to load
      googleMapsPromise = new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (window.google?.maps?.places) {
            isLoaded = true;
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });

      googleMapsPromise
        .then(() => {
          isLoaded = true;
          setLoaded(true);
        })
        .catch((err) => setError(err.message));
      return;
    }

    // Load the script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError("Google Maps API key not configured");
      return;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        `https://maps.googleapis.com/maps/api/js` +
        `?key=${apiKey}` +
        `&libraries=places` +
        `&loading=async`;

      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Wait for places library to be ready
        const checkPlaces = () => {
          if (window.google?.maps?.places) {
            isLoaded = true;
            resolve();
          } else {
            setTimeout(checkPlaces, 50);
          }
        };
        checkPlaces();
      };

      script.onerror = () => {
        reject(new Error("Failed to load Google Maps"));
      };

      document.head.appendChild(script);
    });

    googleMapsPromise
      .then(() => {
        isLoaded = true;
        setLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return { loaded, error };
};
