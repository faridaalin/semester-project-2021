import { useRouter, useEffect, useContext } from 'next/router';
import Layout from '../../components/layout/Layout';
import { TodosProvider } from '../../context/HotelsContext';
import useHotels from '../../context/HotelsContext.js';

const Category = (props) => {
  const router = useRouter();
  //   const [hotels, setHotels, getHotels] = useHotels();
  //   const contextHotels = getHotels();
  console.log('contextHotels', useHotels());
  console.log('Router', router.query.slug);
  // save in context ampFirstPages
  // render category based on slug name
  return (
    <Layout title='Hotel Detail'>
      <TodosProvider>Hotel Category</TodosProvider>
    </Layout>
  );
};

export default Category;
