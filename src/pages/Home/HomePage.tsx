import styles from "../../styles/main.module.scss";
import TopMovies from "./TopMovies/TopMovies";
import Hero from "./Hero/Hero";

const HomePage = () => {
  return (
    <div className={styles["app-wrapper"]}>
      <Hero />
      <TopMovies />
    </div>
  );
};

export default HomePage;