import s from "./HomePage.module.scss";
import TopMovies from "./TopMovies/TopMovies";
import Hero from "./Hero/Hero";

const HomePage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Hero />
        <TopMovies />
      </div>
    </div>
  );
};

export default HomePage;