import { Spinner } from "phosphor-react"
import { useGetLessonsQuery } from "../../graphql/generated"

import { Lesson } from "../Lesson"

export function Sidebar() {
  const { data, loading } = useGetLessonsQuery()

  return (
    <aside className='w-[348px] bg-gray-700 p-6 border-l border-gray-600'>
      <span className='font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block'>
        Cronograma de aulas
      </span>

      {loading ? (
        <Spinner size={32} />
      ) : (
        <div className='flex flex-col gap-8'>
          {data?.lessons.map((lesson) => (
            <Lesson
              key={lesson.id}
              availableAt={new Date(lesson.availableAt)}
              slug={lesson.slug}
              title={lesson.title}
              type={lesson.lessonType}
            />
          ))}
        </div>
      )}
    </aside>
  )
}
