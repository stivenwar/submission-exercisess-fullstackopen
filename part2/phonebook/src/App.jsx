import { useState } from 'react'
import PersonForm from "./PersonForm.jsx";
import Filter from "./Filter.jsx";
import Persons from "./Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' ,number: "39-44-5323523",id: 0}
    ])
    const [personsFilter, setPersonsFilter] =useState([{name:'',number: '',id: 0}])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [idPerson, setIdPerson] = useState(1)
    const [isSearch, setIsSearch] = useState(false)
    const [newSearch, setNewSearch] = useState('')

    const addInfoPerson = (event) => {
        event.preventDefault()
        // console.log(event.target)
        const exist = persons.find(person =>person.name === newName)

        if (!newNumber) {
            alert(`Number is empty`)
            return
        }
        if (!newName){
            alert(`Name is empty`)
            return
        }

        if (exist){
            alert(`${newName} is already added to phonebook`)
        }else {

            const  objectName = {
                name : newName,
                number : newNumber,
                id: idPerson
            }
            setPersons(persons.concat(objectName))
            setNewName("")
            setNewNumber("")
            setIdPerson(idPerson+1)
        }

    }
    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
        setIsSearch(false)
        setNewSearch('')

    }
    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
        setIsSearch(false)
        setNewSearch('')
    }
    const handlePersonShow = (event) => {
        // console.log(event.target.value)
        setNewSearch(event.target.value)
        const personFilter = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));

        if (personFilter){
            setPersonsFilter(personFilter)
            setIsSearch(true)
        }

    }
    const PersonJson = {
        addInfo: addInfoPerson,
        handleName: handleNameChange,
        newName: newName,
        handleNumber :handleNumberChange,
        newNumber: newNumber
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handlePersonShow={handlePersonShow} newSearch={newSearch}/>

            <h3>add a new</h3>

            <PersonForm  jsonPerson={PersonJson}/>


            <h3>Numbers</h3>
            {/*<div>debug: {newName}</div>*/}
            {/*<div>debug: {newNumber}</div>*/}

            <Persons isSearch={isSearch} persons={persons} personsFilter={personsFilter}  />

        </div>
    )
}

export default App
