import React, { useRef, useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  }) => void;
  value?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  notes?: string;
  onNotesChange?: (notes: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  fontFamily?: "gilroy-medium" | "gilroy-semibold";
  rounded?: "lg" | "full";
  placeholderVariant?: "light" | "dark";
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  value,
  notes,
  onNotesChange,
  error,
  disabled = false,
  placeholder = "Start typing address...",
  label = "Pickup Location",
  labelFontFamily = "gilroy-medium",
  fontFamily = "gilroy-medium",
  rounded = "lg",
  placeholderVariant = "dark",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [localAddress, setLocalAddress] = useState(value?.address || "");
  const [focused, setFocused] = useState(false);

  const { loaded: googleLoaded, error: loadError } = useGoogleMaps();

  useEffect(() => {
    if (googleLoaded && inputRef.current) {
      initAutocomplete();
    }

    return () => {
      if (autocompleteRef.current && window.google) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [googleLoaded]);

  useEffect(() => {
    if (value?.address !== localAddress) {
      setLocalAddress(value?.address || "");
    }
  }, [value?.address]);

  const initAutocomplete = () => {
    if (!window.google?.maps?.places || !inputRef.current) {
      return;
    }

    if (autocompleteRef.current) {
      google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "ng" },
          fields: ["address_components", "formatted_address", "geometry"],
        }
      );

      autocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          updateLocation(place);
        }
      });
    } catch (err) {
      console.error("Error initializing autocomplete:", err);
    }
  };

  const updateLocation = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry || !place.geometry.location) {
      console.warn("Selected place has no geometry", place);
      return;
    }

    const addressComponents = place.address_components || [];

    const getComponent = (types: string | string[]) => {
      if (!Array.isArray(types)) types = [types];
      for (let type of types) {
        const component = addressComponents.find((c) => c.types.includes(type));
        if (component) return component.long_name;
      }
      return "";
    };

    const location = {
      address: place.formatted_address || "",
      city:
        getComponent(["locality", "administrative_area_level_2"]) || "Lagos",
      state: getComponent("administrative_area_level_1") || "Lagos",
      country: getComponent("country") || "Nigeria",
      postalCode: getComponent("postal_code") || "",
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    setLocalAddress(location.address);
    onLocationSelect(location);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Label */}
      {label && (
        <label
          className={clsx(
            "text-sm",
            labelFontFamily === "gilroy-medium" && "font-gilroy-medium",
            labelFontFamily === "gilroy-bold" && "font-gilroy-bold"
          )}
        >
          {label}
        </label>
      )}

      {/* Address Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || !googleLoaded}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            "border border-neutral-200 p-4 pl-11 bg-white text-black w-full",
            "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
            fontFamily === "gilroy-medium" && "font-gilroy-medium",
            fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
            rounded === "full" && "rounded-full",
            rounded === "lg" && "rounded-lg",
            placeholderVariant === "light" && "placeholder:text-neutral-350",
            placeholderVariant === "dark" && "placeholder:text-neutral-425",
            (disabled || !googleLoaded) &&
              "bg-gray-100 cursor-not-allowed opacity-60"
          )}
        />
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-425" />
      </div>

      {/* Loading State */}
      {!googleLoaded && !loadError && (
        <div className="flex items-center gap-2 text-xs text-blue-600 font-gilroy-medium">
          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Google Maps...</span>
        </div>
      )}

      {/* Load Error */}
      {loadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700 font-gilroy-medium">
            Error: {loadError}
          </p>
          <p className="text-xs text-red-600 mt-1 font-gilroy-medium">
            Please check your API key configuration
          </p>
        </div>
      )}

      {/* Helper Text */}
      {googleLoaded && !loadError && !value && (
        <p className="text-xs text-neutral-425 font-gilroy-medium">
          Type an address and select from dropdown suggestions
        </p>
      )}

      {/* Selected Location Display */}
      {value && value.latitude !== 0 && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-300">
          <p className="text-sm text-gray-700 mb-1 font-gilroy-medium">
            <span className="font-gilroy-bold">Selected:</span> {value.address}
          </p>
          <p className="text-xs text-gray-500 font-gilroy-medium">
            📍 {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
          </p>
        </div>
      )}

      {/* Additional Notes Input */}
      {onNotesChange && (
        <input
          ref={notesRef}
          type="text"
          placeholder="Additional notes (optional)"
          value={notes || ""}
          onChange={(e) => onNotesChange(e.target.value)}
          disabled={disabled}
          className={clsx(
            "border border-neutral-200 p-4 bg-white text-black w-full",
            "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
            fontFamily === "gilroy-medium" && "font-gilroy-medium",
            fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
            rounded === "full" && "rounded-full",
            rounded === "lg" && "rounded-lg",
            placeholderVariant === "light" && "placeholder:text-neutral-350",
            placeholderVariant === "dark" && "placeholder:text-neutral-425",
            disabled && "bg-gray-100 cursor-not-allowed opacity-60"
          )}
        />
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            className="text-sm font-source-sans text-red"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
