import Image from "next/image";
import Header from "../components/Header/Header";
import HomeHero from "./HomeHero";
import HomeHero2 from "./HomeHero2";
import HomeHero3 from "./HomeHero3";


export default function Home() {
  return (
    <div>
      <Header />
      <HomeHero />
      <HomeHero2 />
      <HomeHero3 />
    </div>
  );
}
