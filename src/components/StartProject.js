import React, { useState, useRef, useEffect } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { validateStart } from './Validations'

const StartProject = ({ projectDonations, setProjectDonations, setStartingErrorMessage, setSuccessMessage }) => {
    //used to store the name of the project one wants to start
    const [startProject, setStartProject] = useState("")
    //used to determine if suggestion list is shown
    const [display, setDisplay] = useState(false)
    //used on deteming when click outside the suggestion list
    const wrapperRef = useRef(null)

    //handles the change on the name of the startable project
    const handleStartChange = (event) => {
        event.preventDefault()
        setDisplay(true)
        setStartProject(event.target.value)
    }

    const handleProjectStartSubmit = (event) => {
        event.preventDefault()
        validateStart(projectDonations, setStartingErrorMessage, startProject, setProjectDonations, setSuccessMessage)
    }

    //used to determine when we click outside of the suggestion list
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false)
        }
    };

    return (
        <div>
            <h2>Toteuta projekti</h2>
            <form onSubmit={handleProjectStartSubmit}>
                <Form.Group>
                    <Form.Label>
                        Projektin nimi:
                    </Form.Label>

                    <Form.Control
                        className=" w-50"
                        type="text"
                        required="required"
                        name="name"
                        value={startProject}
                        onChange={handleStartChange}
                    />
                    
                    <ListGroup ref={wrapperRef}>
                        {display && (
                            <div >
                                {projectDonations
                                    .filter(({ name }) => name.toLowerCase().indexOf(startProject.toLowerCase()) > -1)
                                    .map((v, i) => {
                                        return (
                                            <ListGroup.Item
                                                onClick={(() => {setStartProject(v.name); setDisplay(false)}) } key={i}
                                                className="w-25" variant="success"
                                            >
                                                {v.name}
                                            </ListGroup.Item>
                                        )
                                    }
                                    )}
                            </div>
                        )}
                    </ListGroup>

                    <Button className="mt-2" variant="success" type="submit">Toteuta</Button>
                </Form.Group>
            </form>
        </div>
    )
}

export default StartProject