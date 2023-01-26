interface HabitProps {
  completed: number
}

export function Habit(props: HabitProps) {
  return (
    <div className="bg-gray-50">
      {props.completed}
    </div>
  )
}