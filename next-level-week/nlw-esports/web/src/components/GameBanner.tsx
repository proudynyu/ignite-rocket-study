import React, { FC } from "react";

export const GameBanner: FC<GameBannerProps> = ({
  adsCount,
  bannerUrl,
  link,
  title,
}) => {
  return (
    <a href={link} className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={title} />
      <div className="absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient">
        <strong className="text-white text-base font-bold">{title}</strong>
        <span className="text-zinc-300 text-sm block mt-1">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
};
