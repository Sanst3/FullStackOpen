import React from 'react'

const CourseParts = ({ parts }) => {
  return (<>
  {parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
  </>)
}

const CourseSum = ({ parts }) => {
  let sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (<p><b>
  total of {sum} exercises
  </b></p>)
}

const Course = ({ course }) => {
  return (<div>
  <h2>{course.name}</h2>
  <CourseParts parts={course.parts} />
  <CourseSum parts={course.parts} />
  </div>)
}

const Courses = ({ courses }) => {
  let result = courses.map((course) => {
  return <Course key={course.id} course={course} />
  })

  return (<div>{result}</div>)
}

export default Courses