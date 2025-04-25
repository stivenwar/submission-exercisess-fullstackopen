const Filter =(props) =>{
    return (
        <div>
            filter show with <input onChange={props.handlePersonShow} value={props.newSearch}/>
        </div>
    )
}
export default Filter
