import Layout from '../components/layout/Layout';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { parseCookies } from '../helpers/parseCookies';

export default function Dashboard({ data }) {
  const user = useAuthContext();
  console.log('user', data.user);
  return (
    <Layout>
      Dashboard
      <p>Data from cookie:</p>
    </Layout>
  );
}

// Dashboard.getInitialProps = async ({ req, res }) => {
//   const data = parseCookies(req);
//   console.log('REQ', req);
//   console.log('res', res);
//   console.log('data', data);

//   // if (res) {
//   //   if (Object.keys(data).length === 0 && data.constructor === Object) {
//   //     res.writeHead(301, { Location: '/' });
//   //     res.end();
//   //   }
//   // }

//   return {
//     data: data && data,
//   };
// };
