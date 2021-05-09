import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';

export default function Dashboard(props) {
  const user = useAuthContext();
  console.log('PROPS', props);

  return (
    <Layout>
      Dashboard
      <p>Data from cookie:</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const userdata = parseCookies(context.req);
  const token = userdata.jwt;

  let data;
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
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

    data = {
      message: messagesRes.data,
      enquiries: enquiriesRes.data,
    };
  } catch (err) {
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
