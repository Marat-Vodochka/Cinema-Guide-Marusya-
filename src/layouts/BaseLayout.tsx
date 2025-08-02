import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components//Header/Header';
import s from './BaseLayout.module.scss';


const BaseLayout = () => {
  return (
    <div className={s.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;