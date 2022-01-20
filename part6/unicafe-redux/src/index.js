import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer);


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>   
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        no feedback given
      </div>
    )
  }

  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(good-bad)/all} />
          <StatisticLine text="positive" value={`${good/all*100} %`} />
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Statistics 
        good={store.getState().good}
        neutral={store.getState().ok}
        bad={store.getState().bad}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
