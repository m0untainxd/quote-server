import React, {useState} from 'react'
import NavbarLoggedIn from './NavbarLoggedIn'

function Home() {

    const user = JSON.parse(sessionStorage.getItem('auth'));
    console.log(user)

    const [name, setName] = useState('')

    const [people, setPeople] = useState([{
        name: '',
        hours: 0
    }])

    const [resources, setResources] = useState([{
        name: '',
        amount: 0,
        cost: 0.0
    }])

    const handleChange = name => event => {
        setName({...name, [name]: event.target.value})
    }

    const handleChangePeople = (index, event) => {
        let data = [...people];
        data[index][event.target.name] = event.target.value
        setPeople(data)
    }

    const handleChangeResources = (index, event) => {
        let data = [...resources];
        data[index][event.target.name] = event.target.value
        setResources(data)
    }

    const addFieldsPeople = () => {
        let newfield = {name: '', hours: 0}
        setPeople([...people, newfield])
    }

    const addFieldsResources = () => {
        let newfield = {name: '', hours: 0}
        setResources([...people, newfield])
    }

    const handleSubmit = (e) => {
        // not done yet
    }

    return (
        <div>
            <NavbarLoggedIn />
            <div className="container shadow my-5">
                <div className="d-flex flex-column align-items-center">
                    <h1 className="display-4">Hello {user.user.name}</h1>
                    <p className="lead">Enter details of your quote to calculate the cost.</p>
                </div>
                <div className="p-5">
                    <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" onChange={handleChange('name')} />
                    </div>
                    <h3>Developers</h3>
                    <p className="lead">Enter pay grade and hours for developer.  Press Add to add multiple</p>
                    {people.map((input, index) => {
                        return (
                            <div key={index} className='shadow p-5'>
                                <div className="mb-3">
                                    <label for="dev_name" className="form-label">Developer Pay Grade</label><br />
                                    <select name="name" id="name" onChange={event => handleChangePeople(index, event)}>
                                        <option value="Junior Developer">Junior Developer</option>
                                        <option value="Standard Developer">Standard Developer</option>
                                        <option value="Senior Developer">Senior Developer</option>
                                    </select><br /> 
                                </div>
                                <div className="mb-3">
                                    <label for="hours" className='form-label'>Amount of hours</label>
                                    <input type="number" className='form-control' id="hours" name="hours" onChange={event => handleChangePeople(index, event)} />
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addFieldsPeople}>Add</button>

                    <h3>Resources</h3>
                    <p className="lead">Enter other costs such as physical resources, running costs etc</p>
                    {resources.map((input, index) => {
                        return (
                            <div key={index} className='shadow p-5'>
                                <div className="mb-3">
                                    <label for="res_name" className="form-label">Cost Name</label><br />
                                    <input type="name" className="form-control" id="name" name="name" onChange={event => handleChangeResources(index, event)}/><br /> 
                                </div>
                                <div className="mb-3">
                                    <label for="units" className='form-label'>Amount of units/hours/months</label>
                                    <input type="number" className='form-control' id="hours" name="hours" onChange={event => handleChangeResources(index, event)} />
                                </div>
                                <div className="mb-3">
                                    <label for="cost" className='form-label'>Cost per unit/hour/month</label>
                                    <input type="number" className='form-control' id="hours" name="hours" onChange={event => handleChangeResources(index, event)} />
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addFieldsResources}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Home
