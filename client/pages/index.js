import Layout from '@/components/layout/Layout';
import axios from '@/utils/axios';
import Alert from '@/components/alert/Alert';
import SectionHeading from '@/components/sectionHeading/SectionHeading';
import Card from '@/components/card/Card';
import AttractionsCard from '@/components/card/AttractionsCard';
import CardContainer from '@/components/cardContainer/CardContainer';
import HeroSection from '@/components/heroSection/HeroSection';
import data from '../data/imgCategory.json';

Home.title = 'Holidaze';
Home.description = 'Welcome to holidaze, a hotel booking website.';

export default function Home(props) {
  if (props.data && props.data.status !== 'ok') {
    let status = { sent: false, msg: props.data.message };
    return (
      <Layout>
        <section className='section'>
          <Alert status={status} />
        </section>
      </Layout>
    );
  }

  const { hotels, attractions } = props;

  return (
    <Layout>
      <HeroSection hotels={hotels} />
      <section className='section'>
        <SectionHeading>Customer Favourites</SectionHeading>
        <CardContainer>
          {!hotels ||
            (!hotels.data && (
              <p>Sorry, an error happend. Please come back later.</p>
            ))}
          {hotels.data.map(
            (hotel) =>
              hotel.rating >= 5 && <Card key={hotel._id} hotel={hotel} />
          )}
        </CardContainer>
      </section>
      <section className='section'>
        <SectionHeading>Choose your style</SectionHeading>
        <CardContainer type='category'>
          {data.images.map((style) => (
            <Card key={style.type} hotelStyle={style} />
          ))}
        </CardContainer>
      </section>
      <section className='section'>
        <SectionHeading>Attractions in Bergen</SectionHeading>
        <CardContainer>
          {!attractions ||
            (!attractions.data && (
              <p>Sorry, an error happend. Please come back later.</p>
            ))}
          {!attractions.data ||
            (attractions.data.length === 0 ? (
              <div>Sorry, attractions are currently not avaiable.</div>
            ) : (
              attractions.data.map((attraction, i) => (
                <AttractionsCard key={i} attractions={attraction} />
              ))
            ))}
        </CardContainer>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const hotels = axios.get('/hotels');
    const attractions = axios.get('/attractions');
    const [hotelsResult, attractionsResult] = await Promise.all([
      hotels,
      attractions,
    ]);

    if (!hotelsResult.data || !attractionsResult.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { hotels: hotelsResult.data, attractions: attractionsResult.data },
    };
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data) {
      return {
        props: { data: err.response.data },
      };
    }
  }
}
