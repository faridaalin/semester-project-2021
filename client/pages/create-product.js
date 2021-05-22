import { parseCookies } from '../helpers/parseCookies';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/pageHeader/PageHeader';
import HotelForm from '@/components/form/hotelForm/HotelForm';
import {
  productSchema,
  initialProductValues,
} from '../validationSchema/productSchema';

CreateProduct.title = 'Add new Hotel';
CreateProduct.description = 'Add new hotel to the list';

export default function CreateProduct({ admin, token }) {
  return (
    <Layout>
      <PageHeader title='Create a new hotel' />
      <section className='section'>
        <HotelForm
          schema={productSchema}
          initalValues={initialProductValues}
          newProduct
          endpoint='/hotels/create'
          token={token}
        />
      </section>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;
  const admin = cookie.isAdmin;

  if (!admin || admin !== 'admin' || !token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { admin, token },
  };
}
