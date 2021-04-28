import Link from 'next/link';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <h1>Ooops...</h1>
      <h2>That page cannot be found.</h2>
      <p>
        Go back to the{' '}
        <Link href='/'>
          <a>homepage</a>
        </Link>
      </p>
    </Layout>
  );
};

export default NotFound;
