
const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <strong>Number of exercises {sum}</strong>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}


const Course = ({ course }) => {
  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  )

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  )
}


export default Course