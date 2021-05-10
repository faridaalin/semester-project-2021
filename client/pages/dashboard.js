import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { parseCookies } from '../helpers/parseCookies';

export default function Dashboard(props) {
  const user = useAuthContext();
  console.log('PROPS', props);

  return (
    <Layout>
      <PageHeader title='Dashboard' />
      <section>
        <header>
          <button>back</button>
          <nav>Nav link</nav>
        </header>
        <div>
          <div>Table</div>
          <div>One message</div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);

  const token = cookie.jwt;

  let data;
  try {
    const options = {
      headers: {
        cookie: token,
      },
    };
    const messages = axios.get('/messages', options);
    const enquiries = axios.get('/enquiries', options);

    const [messagesRes, enquiriesRes] = await Promise.all([
      messages,
      enquiries,
    ]);

    if (!messagesRes.data || !enquiriesRes.data) {
      return {
        notFound: true,
      };
    }
    console.log('messagesRes', messagesRes);

    data = {
      message: messagesRes.data,
      enquiries: enquiriesRes.data,
    };
  } catch (err) {
    if (err.response.status === 401) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    console.error(err);
  }

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}
