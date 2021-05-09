import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
import cookie from 'cookie';

export default function Dashboard({ data }) {
  const user = useAuthContext();

  return (
    <Layout>
      Dashboard
      <p>Data from cookie:</p>
    </Layout>
  );
}

Dashboard.getInitialProps = async ({ req, res }) => {
  if (req.headers.cookie) {
    console.log('🔥GET DATA');
    try {
      // const enquiries = await axios.get('/enquiries');
      const messages = await axios.get('/messages');
      // const { data } = messages;
      console.log('messages🔥', messages);

      if (!data) {
        return {
          notFound: true,
        };
      }

      return {
        data: {},
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
  return {
    data: {},
  };
};
