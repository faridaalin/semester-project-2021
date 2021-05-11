import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axios';

const HotelsContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  const getHotels = async () => {
    try {
      const hotels = await axios.get('/hotels');
      const data = hotels.data;
      setHotels(data.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <HotelsContext.Provider value={[hotels, setHotels, getHotels]}>
      {children}
    </HotelsContext.Provider>
  );
};

export function useHotelsContext() {
  return useContext(HotelsContext);
}
