import Head from 'next/head';
import styles from './layout.module.css';
import PageHeader from '../pageHeader/PageHeader';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <PageHeader title={title} />

        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
