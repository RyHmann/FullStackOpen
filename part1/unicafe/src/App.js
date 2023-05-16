import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    console.log("value of good", good)
    setGood(good + 1)
  }

  const addNeutral = () => {
    console.log("value of neutral", neutral)
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    console.log("value of bad", bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={addGood} text="Good"></Button>
      <Button handleClick={addNeutral} text="Neutral"></Button>
      <Button handleClick={addBad} text="Bad"></Button>
      <Heading text="statistics" />
      <Stat count={good} text="good" />
      <Stat count={neutral} text="neutral" />
      <Stat count={bad} text="bad" />
      <Stat count={good + neutral + bad} text="all" />
      <Stat count={(good - bad) / (good + neutral + bad)} text="average" />
      <Stat count={good / (good + neutral + bad) * 100} text="positive" />
    </div>
  )
}

const Heading = ({text}) => {
  return (
    <div><h1>{text}</h1></div>
  )
} 

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Stat = ({text, count}) => {
  return (
    <p>{text} {count}</p>
  )
}

export default App;
