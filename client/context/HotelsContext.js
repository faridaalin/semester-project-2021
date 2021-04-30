import { createContext, useState, useContext } from 'react';
import axios from '../utils/axios';

const HotelsContext = createContext();

export const TodosProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const getHotels = async () => {
    try {
      const hotels = await axios.get(`/hotels/${params.id}`);
      const data = hotels.data;
      console.log('DATA', data);
      setHotels(data);
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

const useHotels = () => {
  return useContext(HotelsContext);
};

export default useHotels;
