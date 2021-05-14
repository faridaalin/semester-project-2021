import { useState } from 'react';
import PureModal from 'react-pure-modal';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
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
  const [itemToDelete, setItemTodelete] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const [modal, setModal] = useState(false);
  const token = props.token;
  const data = !hotels || hotels.length === 0 ? props.data.data : hotels;
  const hotelsPerPage = 6;
  const hotelsVisited = pageNumber * hotelsPerPage;

  const displayHotels = (hotels) => {
    const hotelsToDisplay =
      hotels &&
      hotels
        .slice(hotelsVisited, hotelsVisited + hotelsPerPage)
        .map((hotel) => {
          return (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              setItemTodelete={setItemTodelete}
              setModal={setModal}
            />
          );
        });

    return hotelsToDisplay;
  };

  const pageCount = Math.ceil(data.length / hotelsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDeleteProduct = async () => {
    setDeleteMsg(null);
    setItemTodelete(null);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.delete(
        `/hotels/${itemToDelete._id}/delete`,
        options
      );
      console.log('RES', res);
      if (res.status === 202) {
        const deleteHotel = itemToDelete.title;
        setDeleteMsg(`${deleteHotel} has been deleted`);
        setTimeout(setModal(false), 10000);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status) {
        if (error.response.data.status === 404) {
          return setDeleteMsg('Hotel not found');
        } else if (error.response.data.status === 401) {
          return setDeleteMsg('Access denied!');
        }
      }
      console.log('err', error);
    }
  };
  console.log('deleteMsg', deleteMsg);

  return (
    <Layout>
      <HeroHeaderHotels content={props.data.data} />
      <section className='section'>
        <PageHeader title='Hotels' />
        <>
          <CardContainer>
            {!data && <div>Error happend..</div>}
            {displayHotels(data)}
            <PureModal
              header='Your header'
              footer={
                <div>
                  <button onClick={handleDeleteProduct}>Delete</button>
                  <button onClick={() => setModal(false)}>Cancel</button>
                </div>
              }
              isOpen={modal}
              closeButton='close'
              closeButtonPosition='bottom'
              onClose={() => {
                setModal(false);
                return true;
              }}
            >
              <p>{itemToDelete !== null ? itemToDelete.title : deleteMsg}</p>
            </PureModal>
          </CardContainer>
        </>
        <Pagination pageCount={pageCount} changePage={changePage} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;

  try {
    const hotels = await axios.get('/hotels');
    const { data } = hotels;

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data, token },
    };
  } catch (err) {
    console.error(err);
  }
}
