import React, { useState } from "react";
import AutoComplete from "./AutoComplete"; 

function BasicInfoForm({ formData, handleChange, onPlaceSelect }) {
  const [place, setPlace] = useState(null);

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    onPlaceSelect(selectedPlace);
    // handleChange({
    //   target: { name: "address", value: selectedPlace.address },
    // });
  };
 



  return (
    <div>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.value}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact Number
        <input
          type="text"
          name="contact"
          value={formData.value}
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email_id"
          value={formData.value}
          onChange={handleChange}
        />
      </label>
      <label>
        Address
        <AutoComplete onPlaceSelect={handlePlaceSelect} />
      </label>
      <label>
        Date of Birth
        <input
          type="date"
          name="dob"
          value={formData.value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default BasicInfoForm;
