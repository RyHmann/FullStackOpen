import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    console.log("value of good", good)
    let updatedGood = good + 1
    setGood(updatedGood)
  }

  const addNeutral = () => {
    console.log("value of neutral", neutral)
    let updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const addBad = () => {
    console.log("value of bad", bad)
    let updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={addGood} text="Good"></Button>
      <Button handleClick={addNeutral} text="Neutral"></Button>
      <Button handleClick={addBad} text="Bad"></Button>
      <Heading text="statistics" />
      <Statistics stats={[good, neutral, bad]}/>
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

const Statistics = (props) => {
  let good = props.stats[0]
  let neutral = props.stats[1]
  let bad = props.stats[2]
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = good / all

  if (all < 1) {
    return (
      <div>No feedback given</div>
    )
  }
  else {
    return (
      <table>
        <tbody>
        <StatisticLine count={good} text="good" />
        <StatisticLine count={neutral} text="neutral" />
        <StatisticLine count={bad} text="bad" />
        <StatisticLine count={all} text="all" />
        <StatisticLine count={average} text="average" />
        <StatisticLine count={positive} text="postive" unit="%" />
        </tbody>
      </table>
    )
  }


}

const StatisticLine = ({text, count, unit}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{count}{unit}</td>
    </tr>
  )
}

export default App;
