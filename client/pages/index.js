import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import SectionHeading from '../components/sectionHeading/SectionHeading';
import Card from '../components/card/Card';
import AttractionsCard from '../components/card/AttractionsCard';
import CardContainer from '../components/cardContainer/CardContainer';
import MobileHero from '../components/mobileHero/MobileHero';

export default function Home(props) {
  const { hotels, attractions } = props;

  const images = [
    {
      imageurl: '/boutiqueHotel.png',
      type: 'Boutique Hotel',
      slug: 'boutique-hotel',
    },
    {
      imageurl: '/BB.png',
      type: 'Bed and Breakfast',
      slug: 'bed-and-breakfast',
    },
    {
      imageurl: '/apartment.png',
      type: 'Apartment Hotel',
      slug: 'apartment-hotel',
    },
  ];

  if (!hotels.data || hotels.data.length === 0) {
    return (
      <Layout>
        <div>Sorry, please come back later.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <MobileHero />
      <section>
        <SectionHeading>Customer Favourites</SectionHeading>
        <CardContainer>
          {hotels.data.map(
            (hotel) =>
              hotel.rating >= 5 && <Card key={hotel._id} hotel={hotel} />
          )}
        </CardContainer>
      </section>
      <section>
        <SectionHeading>Choose your style</SectionHeading>
        <CardContainer>
          {images.map((style) => (
            <Card key={style.type} hotelStyle={style} />
          ))}
        </CardContainer>
      </section>
      <section>
        <SectionHeading>Attractions in Bergen</SectionHeading>
        <CardContainer>
          {!attractions.data ||
            (attractions.data.length === 0 ? (
              <div>Sorry, error happend</div>
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

export async function getStaticProps() {
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
  }
}
