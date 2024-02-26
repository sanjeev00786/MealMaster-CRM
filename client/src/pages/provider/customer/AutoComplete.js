import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const AutoComplete = ({ onPlaceSelect }) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCkPMQbY9-dA9BdFECSTIxwZqa7mXIwOgY",
    libraries: ["places"]
  });

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["address_components", "geometry", "icon", "name"],
      }
    );

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const { geometry } = place;
        let formatted_address = "";
        console.log(place.address_components)
        for (const component of place.address_components) {
          console.log('enter in of loop', component)
          const { long_name, types } = component;
          if (types.includes("street_number") || types.includes("route")) {
            formatted_address += `${long_name} `;
          } else if (types.includes("neighborhood") || types.includes("locality")) {
            formatted_address += `${long_name}, `;
          } else if (types.includes("country")) {
            formatted_address += `${long_name}, `;
          } else if (types.includes("postal_code")) {
            formatted_address += `${long_name}`;
          }
        } 
        
        formatted_address = formatted_address.replace(/, $/, "");
        const { lat, lng } = geometry.location;
      console.log('places string', place )
        onPlaceSelect({
          address: formatted_address,
          latitude: lat(),
          longitude: lng(),
        });
    });
    autoCompleteRef.current = autocomplete;
}, [isLoaded, loadError, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      placeholder="Enter location"
      type="text"
      name="address"
    />
  );
};

export default AutoComplete;