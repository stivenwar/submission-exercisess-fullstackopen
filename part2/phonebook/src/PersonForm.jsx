const PersonForm = (props) =>{
    return (
        <form onSubmit={props.jsonPerson.addInfo}>
            <div>
                name: <input onChange={props.jsonPerson.handleName} value={props.jsonPerson.newName}/>
            </div>
            <div>
                <div>number: <input onChange={props.jsonPerson.handleNumber} value={props.jsonPerson.newNumber}/></div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm
