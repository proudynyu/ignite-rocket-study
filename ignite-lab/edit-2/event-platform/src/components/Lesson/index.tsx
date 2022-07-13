import { FC } from "react"
import { Link, useParams } from "react-router-dom"
import { CheckCircle, Lock } from "phosphor-react"
import classnames from "classnames"
import { isPast, format } from "date-fns"
import ptBr from "date-fns/locale/pt-BR"

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: "live" | "class"
}

export const Lesson: FC<LessonProps> = ({ availableAt, slug, title, type }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(availableAt)

  const availableDateFormat = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBr,
    }
  )

  const isActiveLesson = paramSlug === slug

  return (
    <Link to={`/event/lessons/${slug}`} className='group'>
      <span className='text-gray-300'>{availableDateFormat}</span>

      <div
        className={classnames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className='flex items-center justify-between'>
          {isLessonAvailable ? (
            <span
              className={classnames(
                "flex items-center gap-2 text-sm font-medium",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className='flex items-center gap-2 text-sm text-orange-500 font-medium'>
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className='text-xs rounded px-2 py-[0.125rme] text-white border border-green-300 font-bold'>
            {type === "live" ? "AO VIVO" : "AULA"}
          </span>
        </header>

        <strong
          className={classnames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  )
}
