import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Head>
        <title>404</title>
      </Head>
      <section className='section'>
        <h1>Ooops...</h1>
        <h2>That page cannot be found.</h2>
        <p>
          Go back to the{' '}
          <Link href='/'>
            <a>homepage</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default NotFound;
