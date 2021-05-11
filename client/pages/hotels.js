import { useState } from 'react';
import axios from '../utils/axios';
import Layout from '../components/layout/Layout';
import HotelCard from '../components/card/hotelCard/hotelCard';
import CardContainer from '../components/cardContainer/CardContainer';
import HeroHeaderHotels from '../components/heroHeaderHotels/HeroHeaderHotels';
import PageHeader from '../components/pageHeader/PageHeader';
import Pagination from '../components/pagination/Pagination';
import { useHotelsContext } from '../context/HotelsContext';

export default function Hotels(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [hotels, setHotels] = useHotelsContext();
  const data = !hotels || hotels.length === 0 ? props.data.data : hotels;

  const hotelsPerPage = 6;
  const hotelsVisited = pageNumber * hotelsPerPage;

  const displayHotels = (hotels) => {
    const hotelsToDisplay =
      hotels &&
      hotels
        .slice(hotelsVisited, hotelsVisited + hotelsPerPage)
        .map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        });

    return hotelsToDisplay;
  };

  const pageCount = Math.ceil(data.length / hotelsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log('hotels', hotels);

  return (
    <Layout>
      <HeroHeaderHotels content={props.data.data} />
      <section className='section'>
        <PageHeader title='Hotels' />
        <>
          <CardContainer>
            {!data && <div>Error happend..</div>}
            {displayHotels(data)}
          </CardContainer>
        </>
        <Pagination pageCount={pageCount} changePage={changePage} />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const hotels = await axios.get('/hotels');
    const { data } = hotels;

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data },
    };
  } catch (err) {
    console.error(err);
  }
}
