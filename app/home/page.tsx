import { JSX } from "react";
import HomeHero from "./HomeHero";
import HomeHero2 from "./HomeHero2";
import HomeHero3 from "./HomeHero3";
import HomeHero4 from "./HomeHero4";
// import MenuCard from "./MenuHero";

export default function Home(): JSX.Element {
  return (
    <div>
      <HomeHero />
      <HomeHero2 />
      <HomeHero3 />
      <HomeHero4 />
    </div>
  );
}
