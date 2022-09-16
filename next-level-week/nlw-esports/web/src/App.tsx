import { useEffect, useState } from "react";

import { GameBanner } from "./components/GameBanner";
import { axios } from "./services/axios";
import logo from "./assets/logo.svg";
import { DidnFindYourDuo } from "./components/DidnFindYourDuo";

export function App() {
  const [gameBanners, setGameBanners] = useState<GameBannerProps[]>(
    [] as GameBannerProps[]
  );

  useEffect(() => {
    axios.get("/games").then((response) => setGameBanners(response.data));
  }, []);

  return (
    <div className="max-w-[1368px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-4">
        {gameBanners?.map((game) => (
          <GameBanner
            adsCount={game?.adsCount || 0}
            bannerUrl={game?.bannerUrl}
            link={game?.link || "#"}
            title={game?.title}
            key={game?.title}
          />
        ))}
      </div>

      <DidnFindYourDuo />
    </div>
  );
}
