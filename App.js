import React,{useState} from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import data from './data.json'

const App = () => {

    const [contacts, setContacts] = useState(data);
    const [addformData, setAddformData] = useState({
        fullName:'',
        age:'',
        date:'',
    })

    const formChange = (e)=>{
        e.preventDefault();

        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;

        const newFormData = {...addformData};
        newFormData[fieldName] = fieldValue;

        setAddformData(newFormData);
    }

    const HandleSubmit = (e)=>{
        e.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addformData.fullName,
            age: addformData.age,
            date:addformData.date,
        };
        
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    }

    const handleDelete = (contactId)=>{
        const newContacts=[...contacts];

        const index = contacts.findIndex((contact)=> contact.id===contactId);

        newContacts.splice(index,1);

        setContacts(newContacts);
    }
    
    return (
        <div className="app-container">
            <h2>Add data</h2>
            <form onSubmit={HandleSubmit}>
                <input 
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter full name...."
                    onChange={formChange}
                />
                <input 
                    type="number"
                    name="age"
                    required
                    placeholder="Enter age"
                    onChange={formChange}
                />
                <input
                    type="date"
                    name="date"
                    required
                    onChange={formChange}
                />
                <button type="submit">Add</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact,idx)=>(
                        <tr key={idx}>
                            <td>{contact.fullName}</td>
                            <td>{contact.age}</td>
                            <td>{contact.date}</td>
                            <td>
                                <button
                                    style={{
                                    textAlign:'center',
                                    margin:'10px 10px',
                                    padding:'5px 5px'
                                }}
                                type="button" 
                                onClick={()=> handleDelete(contact.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default App
