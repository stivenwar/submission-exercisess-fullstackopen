import { useState } from 'react'

const Button = (props) => {

    return(
        <button onClick={props.onClick}> {props.text}</button>
    )
}
const StatisticsLine =(props)=> {
    return(
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>

    )
}
const Statistics = (props) => {
    // console.log(props.all)
    if (props.all === 0) {
        return <p> No feedback given</p>
    } else {
        return (
            <div>
                <h2>Statistics</h2>
                <table>
                    <tbody>
                    <StatisticsLine text={props.feedBack[0].text} value={props.feedBack[0].value}/>
                    <StatisticsLine text={props.feedBack[1].text} value={props.feedBack[1].value}/>
                    <StatisticsLine text={props.feedBack[2].text} value={props.feedBack[2].value}/>
                    <tr>
                        <td>all</td>
                        <td>{props.all}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{props.average.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{props.positive.toFixed(1)} %</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }

}

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all= good+neutral+bad
    const average = all === 0 ? 0 : (good - bad) / all
    const positive = all===0? 0 :(good / all) * 100

    const feedBack = [
        {
            text: "good",
            HandleClick :() => setGood(good+1),
            value:good
        },
        {
            text: "neutral",
            HandleClick :() => setNeutral(neutral+1),
            value:neutral
        }, {
            text: "bad",
            HandleClick :() => setBad(bad+1),
            value:bad
        }
    ]

    return (

        <div>
            <h1>give feedback</h1>
            {feedBack.map((item, index) => {
                return (
                    <Button key={index} onClick={feedBack[index].HandleClick} text={feedBack[index].text}/>
                )
            })}

            <Statistics feedBack={feedBack} all={all} average={average} positive={positive}/>

        </div>
    )
}

export default App
