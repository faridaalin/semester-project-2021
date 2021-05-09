import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
import cookie from 'cookie';
import { useCookies } from 'react-cookie';

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
  console.log('data', userdata);
  const token = userdata.jwt;

  let data;
  try {
    const messages = await axios.get('/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = messages.data.data;
  } catch (err) {
    console.log('🔥🔥ERROR🔥🔥');
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
