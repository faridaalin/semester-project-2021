import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../utils/axios';
import Layout from '../components/layout/Layout';
import HotelCard from '../components/card/hotelCard/hotelCard';
import CardContainer from '../components/cardContainer/CardContainer';
import HeroHeaderHotels from '../components/heroHeaderHotels/HeroHeaderHotels';
import PageHeader from '../components/pageHeader/PageHeader';

export default function Hotels(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const { data } = props.data;

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

  return (
    <Layout>
      <HeroHeaderHotels />
      <section className='section'>
        <PageHeader title='Hotels' />
        <CardContainer>
          {!data && <div>Error happend..</div>}
          {displayHotels(data)}
        </CardContainer>
        <ReactPaginate
          previousLabel='Previous'
          nextLabel='Next'
          containerClassName='paginationContainer'
          previousClassName='prevBtn'
          nextClassName='nextBtn'
          disabledClassName='paginationDisabled'
          activeClassName='paginationActive'
          pageCount={pageCount}
          onPageChange={changePage}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
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
