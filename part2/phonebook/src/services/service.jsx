import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'


const getAllPersons =() => {
    return axios.get(baseUrl)
}

const createPerson = newObject => {
    return axios.post(baseUrl, newObject)
}

const updatePerson = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}
const deletePerson = ( id )=> {
    console.log(id)
    return axios.delete(`${baseUrl}/`+id)
}

export default {
    getAll: getAllPersons,
    create: createPerson,
    update: updatePerson,
    deletePerson : deletePerson
}
