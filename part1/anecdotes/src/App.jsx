import { useState } from 'react'


const ButtonVote =(props) =>{
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}
const ButtonNext =(props) =>{
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}
const AnecdoteVotes =(props)=> {
    return(
        <>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdoteSelect}<br/>has {props.hasVotes} votes</p>
        </>
    )
}
const AnecdoteMostVote =(props)=>{
        if (props.votes.every(n=>n===0)){
            return(
                <>
                    <p>no votes</p>
                </>
            )
        }else {
            return(
                <>
                    <h1>Anecdote with most votes</h1>
                    <p>{props.mostVoted} <br/>has {props.mayorVote} votes</p>
                </>
            )
        }

}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [vote,setVote] =useState(new Array(anecdotes.length).fill(0))

    let mayor = Math.max(...vote);
    let posicion = vote.indexOf(mayor);

    const voteAnecdotes = () =>{
       const copy = [...vote]
        copy[selected]+=1
        setVote(copy)

    }
    const random =() => {
        setSelected(Math.floor(Math.random()*anecdotes.length))
    }
    return (
        <div>
            <AnecdoteVotes anecdoteSelect={anecdotes[selected]} hasVotes={vote[selected]}/>
            <ButtonVote onClick={voteAnecdotes}  text={"vote"} indexVote={selected} arrayLength={anecdotes.length}></ButtonVote>
            <ButtonNext onClick={random } text={"next anecdote"}/>
            <AnecdoteMostVote votes={vote}   mostVoted={anecdotes[posicion]} mayorVote={mayor}  />

        </div>
    )
}

export default App
