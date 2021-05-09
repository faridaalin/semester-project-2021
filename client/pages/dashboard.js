import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
import cookie from 'cookie';

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

Dashboard.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  console.log('COOKIE🔥', data.jwt);
  const token = data.jwt;
  if (token) {
    console.log('🔥GET DATA');
    try {
      // const enquiries = await axios.get('/enquiries');
      const messages = await axios.get('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { data } = messages;
      console.log('messages🔥', messages.data.data);

      if (!data) {
        return {
          notFound: true,
        };
      }

      return {
        data: messages.data.data,
      };
    } catch (err) {
      console.log('🔥🔥ERROR🔥🔥');
      console.error(err);
    }
  } else {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }
};
