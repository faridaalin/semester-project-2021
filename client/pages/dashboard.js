import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';
import cookie from 'cookie';
import { useCookies } from 'react-cookie';

export default function Dashboard({ data }) {
  const user = useAuthContext();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  console.log('cookies', cookies);
  console.log('data', data);

  function handleRemoveCookie() {
    removeCookie('user');
    setCookie('user', JSON.stringify(data), {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    console.log('Clicked');
  }

  return (
    <Layout>
      Dashboard
      <p>Data from cookie:</p>
      <button onClick={handleRemoveCookie}>Remove Cookie</button>
    </Layout>
  );
}

Dashboard.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  //req.headers.cookie = ''; delete cookie
  console.log('COOKIE🔥', req.headers.cookie);
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
      // console.log('messages🔥', messages.data.data);

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
