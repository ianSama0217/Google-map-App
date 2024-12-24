import { useEffect, useState } from "react";
import { GCP_TOKEN } from "./token";
import imgNoLocation from "../../../public/img/nolocation.png";

interface Coordinates {
  coords: {
    latitude: number;
    longitude: number;
  };
}

function Map() {
  const [error, setError] = useState(false);

  const showError = () => {
    setError(true);
  };

  const initLocation = (position: Coordinates) => {
    try {
      const userLocation = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      const mapOptions: google.maps.MapOptions = {
        zoom: 18,
        center: userLocation,
        mapTypeId: "roadmap",
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        mapId: "b637233970a9d550",
      };

      new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        mapOptions
      );
    } catch (err) {
      console.error("Error initializing map:", err);
      showError();
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initLocation, showError);
    } else {
      showError();
    }
  };

  function loadGoogleMaps(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${token}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google Maps failed to load"));
      document.head.appendChild(script);
    });
  }

  useEffect(() => {
    loadGoogleMaps(GCP_TOKEN)
      .then(() => {
        getLocation();
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
        showError();
      });
  }, []);

  return (
    <div id="map" className="h-screen z-0">
      {error && (
        <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center justify-center">
          <img src={imgNoLocation} />
        </div>
      )}
    </div>
  );
}

export default Map;
