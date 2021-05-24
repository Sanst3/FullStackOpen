import React, { useState } from 'react'

const Button = ({ text, handler }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Buttons = ({ goodHandler, neutralHandler, badHandler }) => {
  return (
    <div>
      <Button text="Good" handler={() => goodHandler()} />
      <Button text="Neutral" handler={() => neutralHandler()} />
      <Button text="Bad" handler={() => badHandler()} />
    </div>
  )
}

const StatRow = ({ stat, value }) => {
  return (
    <tr>
      <td>{stat}</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = ({ ratings }) => {
  if (ratings.all === 0) {
    return (<p>No feedback given</p>)
  } else {
    return (
      <table>
        <StatRow stat="Good" value={ratings.good} />
        <StatRow stat="Neutral" value={ratings.neutral} />
        <StatRow stat="Bad" value={ratings.bad} />
        <StatRow stat="All" value={ratings.all} />
        <StatRow stat="Average" value={(ratings.good - ratings.bad) / ratings.all} />
        <StatRow stat="Positive" value={ratings.good / ratings.all} />
    </table>
    )
    
  }
}

const Heading = ({ heading }) => {
  return (<h1>{heading}</h1>)
}

const App = () => {
  // save clicks of each button to its own state
  const [ratings, setRatings] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })
  const addGood = () => setRatings({...ratings, good: ratings.good + 1, all: ratings.all + 1});
  const addNeutral = () => setRatings({...ratings, neutral: ratings.neutral + 1, all: ratings.all + 1});
  const addBad = () => setRatings({...ratings, bad: ratings.bad + 1, all: ratings.all + 1});

  return (
    <div>
      <Heading heading="Give Feedback" />
      <Buttons goodHandler={addGood} neutralHandler={addNeutral} badHandler={addBad} />
      <Heading heading="Statistics" />
      <Stats ratings={ratings} />
    </div>
  )
}

export default App
