const Persons = (props)=>{
    return (
        <>
            {(props.isSearch === true ? props.personsFilter : props.persons).map((persons) => ( <div key={persons.id}> { persons.name } {persons.number}</div>))}

        </>

)
}

export  default Persons
