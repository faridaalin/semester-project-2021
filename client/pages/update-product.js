import { parseCookies } from '../helpers/parseCookies';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/pageHeader/PageHeader';
import HotelForm from '../components/form/hotelForm/HotelForm';
import {
  productSchema,
  initialProductValues,
} from '../validationSchema/productSchema';

export default function UpdateProduct({ admin, token }) {
  return (
    <Layout>
      <PageHeader title='Update hotel' />
      <HotelForm
        schema={productSchema}
        initalValues={initialProductValues}
        newProduct
        endpoint='/hotels/6082e81ef88761b1ba707cc7c/update'
        token={token}
      />
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
