import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import 'dotenv/config';
import axios from "axios";
const Empty = () => {
  const dispatch = useDispatch();

  // console.log("URL=>",import.meta.env.VITE_DATA_URL)
  useEffect(() => {
    axios.get('https://api.waqi.info/feed/Virar/?token=cb6b5dc97a7fba05fd78a56d053782308b9586a7').then((response) => {
      console.log("dtaa",response.data.data)
      dispatch({
        type: "dataReducer",
        payload: response.data.data,
      });
      dispatch({
        type: "isLoadingReducer",
        payload: false,
      });
    });
  }, []);

  return <></>;
};
export default Empty;
