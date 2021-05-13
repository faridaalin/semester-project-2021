import Layout from '../components/layout/Layout';
import PageHeader from '../components/pageHeader/PageHeader';
import HotelForm from '../components/form/hotelForm/HotelForm';
import {
  productSchema,
  initialProductValues,
} from '../validationSchema/productSchema';

export default function CreateProduct() {
  return (
    <Layout>
      <PageHeader title=' Create a new product' />
      <section className='section'>
        <HotelForm
          schema={productSchema}
          initalValues={initialProductValues}
          newProduct
          endpoint='/hotels/create'
        />
      </section>
    </Layout>
  );
}
