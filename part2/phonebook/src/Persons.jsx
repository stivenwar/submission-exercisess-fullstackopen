

const Persons = (props)=>{


    return (
        <>
            {(props.isSearch === true ? props.personsFilter : props.persons).map((persons) => (
                    <div key={persons.id} > {persons.name} {persons.number}
                        <button onClick={()=> {
                           props.handleDelete(persons.id,persons.name)}} >Delete</button>
                    </div>

            ))}

        </>
    )
}
export  default Persons
