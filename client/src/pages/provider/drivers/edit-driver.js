import React, { useState, useEffect } from "react";
import DriverForm from "./add-driver-form.js";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import "../../CSS/variable.css"


export default function EditDriverForm() {
  const { loginToken } = useParams();

 const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_DRIVER}?login_token=${loginToken}`
        );

        console.log(response.data)
        setDriverData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchDriverData();
  }, [loginToken]);

  return (
    <React.Fragment>
      {driverData && <DriverForm driverData={driverData} />}
    </React.Fragment>
  );
}
