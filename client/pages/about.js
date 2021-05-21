import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/pageHeader/PageHeader';
import styles from './about.module.css';

About.title = 'About';
About.description = 'Holidaze is a hotel booking agency located in Bergen.';
export default function About() {
  return (
    <Layout>
      <PageHeader title='About' />
      <section className={`section ${styles.container}`}>
        <div className={styles.imageContainer}>
          <Image
            src='/about.jpg'
            alt='Picture of a building'
            layout='fill'
            objectFit='cover'
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.h3}>Holidaze</h3>
          <p className={styles.paragraph}>
            We are a local tourism agency in Bergen. Our service is to provide
            our clients with rememberable hotel experiences. We hope you are
            able to find an accommodation of your style.
          </p>
          <p className={styles.paragraph}>
            If you want to get in touch with us you can send us a{' '}
            <Link href='/contact'>
              <a>message</a>
            </Link>
            .
          </p>
          <h4 className={styles.note}>Note</h4>
          <p className={styles.paragraph}>
            This website was created for educational purpose only. All images
            are borrowed and some of the content. Owners are credited in the
            source code.
          </p>
        </div>
      </section>
    </Layout>
  );
}
