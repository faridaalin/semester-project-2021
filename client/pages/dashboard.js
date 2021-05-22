import Layout from '@/components/layout/Layout';
import axios from '@/utils/axios';
import Alert from '@/components/alert/Alert';
import PageHeader from '@/components/pageHeader/PageHeader';
import { parseCookies } from '@/helpers/parseCookies';
import DashboardComp from '@/components/dashboardComp/DashboardComp';

Dashboard.title = 'Dashboard';
Dashboard.description =
  'Dashboard for administration. Get overview of revervations and messages.';

export default function Dashboard(props) {
  if (
    (props.data && props.data.status === 404) ||
    props.data.messages.status !== 'ok' ||
    props.data.enquiries.status !== 'ok'
  ) {
    let status = { sent: false, msg: props.data.message };
    return (
      <Layout>
        <section className='section'>
          <Alert status={status} />
        </section>
      </Layout>
    );
  }

  const { messages, enquiries } = props.data;

  return (
    <Layout>
      <PageHeader title='Dashboard' />
      <DashboardComp messages={messages} enquiries={enquiries} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;
  const admin = cookie.isAdmin;

  let data;
  try {
    if (!admin || !token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
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
      messages: messagesRes.data,
      enquiries: enquiriesRes.data,
    };

    return {
      props: { data },
    };
  } catch (err) {
    console.error(err);

    if (err.response.status === 401) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return {
        props: { data: err.response.data },
      };
    }
  }
}
