import { useState , useEffect} from 'react'
import personService from './services/service.jsx'
import PersonForm from "./PersonForm.jsx";
import Filter from "./Filter.jsx";
import Persons from "./Persons.jsx";
import "../index.css"

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
    const [openDivAdded, setOpenDivAdded] = useState(false)
    const [openDivError, setOpenDivError] = useState(false)


    useEffect(() => {
        console.log("effect")
        personService
            .getAll()
            .then(response=> {
                // console.log(response.data)
                const data = response.data
                let countData = data.length > 0 ? Math.max(...data.map(p => p.id)) : 0;
                // console.log(data)
                setIdPerson(countData)
                setPersons(data)
            })

    },[])

    // useEffect(() => {
    //     console.log('effect')
    //
    //     const eventHandler = response => {
    //         console.log('promise fulfilled')
    //         setPersons(response.data)
    //     }
    //
    //     const promise = axios.get('http://localhost:3001/notes')
    //     promise.then(eventHandler)
   // setReload(prev => !prev); para reload entera la info
    // }, [reload])

    const addInfoPerson = (event) => {
        event.preventDefault()
        // console.log(event.target)
        const existName = persons.find(person => {
            if (person.name === newName){
                return person
            }
        })
        console.log(existName)


        if (!newNumber) {
            alert(`Number is empty`)
            return
        }
        if (!newName){
            alert(`Name is empty`)
            return
        }

        if (existName){
            const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
            if (confirm){

                personService.update(existName.id,{id: existName.id,name:existName.name,number: newNumber}).then(responce => {
                    console.log(responce)
                }).catch(error => {
                    console.log(error)
                    setOpenDivError(true)
                    setTimeout(()=> {
                        setOpenDivError(false)
                    },5000)
                })
                setNewName("")
                setNewNumber("")
            }
            // alert(`${newName} is already added to phonebook`)

        } else {

          let  count = idPerson+1
            const  objectName = {
                name : newName,
                number : newNumber,
                id: count.toString()
            }
            setIdPerson(count)
            console.log(objectName.id)
            personService.create(objectName).then(responce => {
                console.log(responce.data)
                setOpenDivAdded(true)
                setTimeout(()=> {
                    setOpenDivAdded(false)
                    setNewName("")
                },3000)
                // setNewName("")
                setNewNumber("")
                setPersons(prev => [...prev, objectName]);


            })
        }

    }
    const handleDelete = (id, name) => {
        const confirm = window.confirm(`delete ${name}`)

        if (confirm){
            personService.deletePerson(id).then(e => {
                console.log(e)
                setPersons(prev => prev.filter(elem =>elem.id !== id))

            }).catch(error=> {
                console.log(error)
            })
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

    const AddedUserAlert = (props) => {

        return (
            <div className={ openDivAdded?"addedUserStyle openDiv" :" closeDiv"}>
                Added {props.name}
            </div>
        )
    }
    const ErrorUserAlert = (props) => {

        return (
            <div className={ openDivError?"errorUserStyleRed openDiv" :" closeDiv"}>
                Information of {props.name} has already been removed from server.
            </div>
        )
    }

    return (
        <div>

            <AddedUserAlert name={newName}/>
            <ErrorUserAlert name={newName}/>

            <h2>Phonebook</h2>

            <Filter handlePersonShow={handlePersonShow} newSearch={newSearch}/>

            <h3>add a new</h3>

            <PersonForm  jsonPerson={PersonJson}/>


            <h3>Numbers</h3>
            {/*<div>debug: {newName}</div>*/}
            {/*<div>debug: {newNumber}</div>*/}

            <Persons  handleDelete={handleDelete} isSearch={isSearch} persons={persons} personsFilter={personsFilter}  />

        </div>
    )
}

export default App
