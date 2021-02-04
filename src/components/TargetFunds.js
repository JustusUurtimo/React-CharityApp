import React, { useState, useRef, useEffect } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { validateTarget } from './Validations'

const TargetFunds = ({ unTargetedDonationsSum, projectDonations, setProjectDonations, setUnTargetedDonationsSum, setFundingErrorMessage, setSuccessMessage }) => {

    //used when adding funds to a project
    const [targetName, setTargetName] = useState("")
    // -||-
    const [targetAmount, setTargetAmount] = useState("")

     //used to determine if suggestion list is shown
     const [display, setDisplay] = useState(false)
     //used on deteming when click outside the suggestion list
     const wrapperRef = useRef(null)


    //handles the change of the name of the project we want to target funding on
    const handleNameChange = (event) => {
        event.preventDefault()
        setTargetName(event.target.value)
        setDisplay(true)
    }
    //handles the change of the amount which we want to give to project
    const handleAmountChange = (event) => {
        event.preventDefault()
        setTargetAmount(event.target.value)
    }

    //handles the submit of the funding
    const handleTargetSubmit = (event) => {
        event.preventDefault()
        //validates the inputs (located on the Validations file)
        validateTarget(unTargetedDonationsSum, targetAmount, projectDonations, targetName, setProjectDonations, setUnTargetedDonationsSum, setFundingErrorMessage, setSuccessMessage)
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        }
    })

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false)
        }
    };

    return (
        <div>
            <h2 className="mt-4">Kohdenna lahjoituksia</h2>
            <form onSubmit={handleTargetSubmit}>
                <Form.Group>
                    <Form.Label>
                        Kohde:
                    </Form.Label>

                    <Form.Control
                        onClick={() => setDisplay(!display)}
                        className=" w-50"
                        value={targetName}
                        type="text"
                        name="projekti"
                        onChange={handleNameChange}
                    />
                    <ListGroup ref={wrapperRef}>
                        {display && (
                            <div >
                                {projectDonations
                                    .filter(({ name }) => name.toLowerCase().indexOf(targetName.toLowerCase()) > -1)
                                    .map((v, i) => {
                                        return (
                                            <ListGroup.Item
                                                onClick={(() => { setTargetName(v.name); setDisplay(false) })} key={i}
                                                className="w-25" variant="success">
                                                {v.name}
                                            </ListGroup.Item>
                                        )
                                    }
                                    )}
                            </div>
                        )}
                    </ListGroup>

                    <Form.Label>
                        Määrä:
                    </Form.Label>

                    <Form.Control
                        className=" w-50"
                        type="text"
                        name="määrä"
                        required="required"
                        onChange={handleAmountChange}
                    />

                    <Button className="mt-2" variant="success" type="submit">Kohdenna</Button>
                </Form.Group>
            </form>
        </div>
    );

}

export default TargetFunds