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
  const data = parseCookies(req);
  const userObj = JSON.parse(data.user);
  const { role } = userObj.data.user;

  if (role !== 'admin') {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }

  return {
    data: userObj.data.user,
  };
};
