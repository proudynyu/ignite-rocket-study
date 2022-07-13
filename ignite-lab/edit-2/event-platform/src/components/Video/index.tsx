import { FC } from "react"
import { DefaultUi, Player, Youtube } from "@vime/react"
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
  Spinner,
} from "phosphor-react"
import "@vime/core/themes/default.css"
import { useGetLessonBySlugQuery } from "../../graphql/generated"

interface VideoProps {
  lessonSlug: string
}

export const Video: FC<VideoProps> = ({ lessonSlug }) => {
  const { data, error, loading } = useGetLessonBySlugQuery()

  if (error) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <span className='text-green-500 font-bold'>An error has occur</span>
      </div>
    )
  }

  if (loading || !data || !data.lesson) {
    return (
      <div className='flex-1 flex items-center justify-center'>
        <Spinner size={48} color='#00875F' />
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <div className='bg-gray-900 flex justify-center'>
        <div className='h-full w-full max-width-[1100px] max-heigth-[58vh] aspect-video'>
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className='p-8 max-w-[1100px] mx-auto'>
        <div className='flex items-start gap-16'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{data.lesson.title}</h1>
            <p className='leading-relaxed mt-4 text-gray-200'>
              {data.lesson.description}
            </p>
            <div className='flex items-center gap-4 mt-6'>
              <img
                className='h-16 w-16 rounded-full border-2 border-blue-500'
                src={data.lesson.teacher?.avatarURL}
                alt='avatar'
              />
              <div className='leading-relaxed'>
                <strong className='font-bold text-2xl block'>
                  {data.lesson.teacher?.name}
                </strong>
                <span className='text-gray-200 text-sm block'>
                  {data.lesson.teacher?.bio}
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <a
              href='#'
              className='p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors'
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href='#'
              className='p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors'
            >
              <Lightning size={24} />
              Acesse o Desafio
            </a>
          </div>
        </div>
        <div className='gap-8 mt-20 grid grid-cols-2'>
          <a
            href='#'
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Material Complementar</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Acesse o material complementar para acelerar o seu
                desenvolvimento.
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href='#'
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Wallpapers exclusivos</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Acesse o material complementar para acelerar o seu
                desenvolvimento.
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
