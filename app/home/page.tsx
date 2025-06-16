import { JSX } from "react";
import HomeHero from "./components/HomeHero";
import HomeHero2 from "./components/HomeHero2";
import HomeHero3 from "./components/HomeHero3";
import HomeHero4 from "./components/HomeHero4";

const Home = (): JSX.Element => {
  return (
    <>
      <HomeHero />
      <HomeHero2 />
      <HomeHero3 />
      <HomeHero4 />
    </>
  );
};
export default Home;
