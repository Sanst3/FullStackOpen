import React, { useState } from 'react'

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Button = ({ text, handler }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Anecdote = ({ string, votes }) => {
  return (
    <div>
      <div>{string}</div>
      <div>Has {votes} votes</div>
    </div> 
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState({
    votes: Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0),
    topIndex: 0,
    topVal: 0
  })

  const addVote = (index) => {
    let copy = {...votes}
    copy.votes[index]++
    if (copy.votes[index] > copy.topVal) {
      copy.topIndex = index
      copy.topVal = copy.votes[index]
    }
    setVotes(copy)
  }

  const handleAnec = () => setSelected(getRandomInt(0, 5))
  const handleVote = () => addVote(selected)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote string={anecdotes[selected]} votes={votes.votes[selected]} />
      <Button text="Vote" handler={handleVote} />
      <Button text="Next Anecdote" handler={handleAnec} />
      <h1>Anecdote with most Votes</h1>
      <Anecdote string={anecdotes[votes.topIndex]} votes={votes.topVal} />
    </div>
  )
}

export default App