import { useState, useEffect } from 'react';
import PureModal from 'react-pure-modal';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
import Layout from '../components/layout/Layout';
import HotelCard from '../components/card/hotelCard/hotelCard';
import CardContainer from '../components/cardContainer/CardContainer';
import HeroHeaderHotels from '../components/heroHeaderHotels/HeroHeaderHotels';
import PageHeader from '../components/pageHeader/PageHeader';
import Pagination from '../components/pagination/Pagination';
import { useHotelsContext } from '../context/HotelsContext';
import { useSearchContext } from '../context/searchContext';
import SearchBar from '../components/form/searchBar/SearchBar';
import Pill from '../components/pill/Pill';
import { useMounted } from '../hooks/hasMounted';
import styles from './hotels.module.css';

export default function Hotels(props) {
  const { hasMounted } = useMounted();
  const [pageNumber, setPageNumber] = useState(0);
  const [hotels, setHotels, getHotels] = useHotelsContext();
  const [content, setContent] = useState(props.data.data);
  const [itemToDelete, setItemTodelete] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const [modal, setModal] = useState(false);
  const { search, setSearch } = useSearchContext();

  const token = props.token;
  const data = !hotels || hotels.length === 0 ? props.data.data : hotels;
  const hotelsPerPage = 6;
  const hotelsVisited = pageNumber * hotelsPerPage;

  const displayHotels = (hotels) => {
    const hotelsToDisplay =
      hasMounted &&
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

  const pageCount = Math.ceil(
    (search.length > 0 ? search.length : data.length) / hotelsPerPage
  );
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

      if (res.status === 202) {
        const deleteHotel = itemToDelete.title;
        setDeleteMsg(`${deleteHotel} has been deleted`);
        setTimeout(setModal(false), 10000);
        getHotels();
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.data.status === 404) {
          return setDeleteMsg('Hotel not found');
        } else if (error.response.data.status === 401) {
          return setDeleteMsg('Access denied!');
        }
      }
      return setDeleteMsg('Error happend, please try again later.');
    }
  };

  return (
    <Layout>
      <section className={styles.searchHero}>
        <div className={styles.searchContainer}>
          <SearchBar
            content={content}
            searchMatch={search}
            setSearchMatch={setSearch}
          />
        </div>
      </section>
      <section className='section'>
        <div>
          <div className={styles.headerContainer}>
            <PageHeader title='Our Hotels' />
            {search.length > 0 && search.length < content.length && (
              <button
                className={styles.viewAllBtn}
                onClick={() => setSearch(props.data.data)}
              >
                View all hotels
              </button>
            )}
          </div>
        </div>
        <>
          <CardContainer suppressHydrationWarning={true}>
            {!data && <div>Error happend..</div>}
            {process.browser &&
              displayHotels(search.length === 0 ? data : search)}
            <PureModal
              header='Header'
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
