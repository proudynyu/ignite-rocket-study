import logo from './assets/logo.svg'

export function App() {
  return (
    <div className='max-w-[1368px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt="logo" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui</h1>
      <div className='grid grid-cols-6 gap-6 mt-4'>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/lol.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>League of Legends</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/apex.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>Apex</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/cs.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>Couter Strike</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/dota.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>Dota 2</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/fortnite.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>Fortnite</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/wow.png" alt="" />
          <div className='absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient'>
            <strong className='text-white text-base font-bold'>World of Warcraft</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
          </div>
        </a>
      </div>
    </div>
  );
}
