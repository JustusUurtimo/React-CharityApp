import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import axios from 'axios';
import Donations from './Donations';
import Projects from './Projects';
import TargetFunds from './TargetFunds';
import StartProject from './StartProject';

const App = () => {
    //all donations
    const [donations, setDonations] = useState([])
    //all projects (used when getting the projects from the API)
    const [projects, setProjects] = useState([])
    // projects and the donations targeted to them
    const [projectDonations, setProjectDonations] = useState([])
    //sum of all donations
    const [allDonationsSum, setAllDonationsSum] = useState(0)

    //sum of untargeted donations
    const [unTargetedDonationsSum, setUnTargetedDonationsSum] = useState(0)

    //success messages
    const [successTargetMessage, setSuccessTargetMessage] = useState(null)
    const [successStartMessage, setSuccessStartMessage] = useState(null)

    //error messages
    const [fundingErrorMessage, setFundingErrorMessage] = useState(null)
    const [startingErrorMessage, setStartingErrorMessage] = useState(null)

    useEffect(() => {
        axios
            .get('https://d27jptknt5oqao.cloudfront.net/kesatyo_lahjoitukset.json')
            .then(response => {
                setDonations(response.data)
                setAllDonationsSum((response.data.reduce((a, v) => a = a + v.sum, 0)))
            })

        axios
            .get('https://d27jptknt5oqao.cloudfront.net/kesatyo_projektit.json')
            .then(response => {
                setProjects(response.data)
            })
    }, [])

    //console.log(helperProjectList)
    // add donations to the projects
    useEffect(() => {
        //use the data gathered to create new list of object containing
        //the project and the amount invested/targeted to them and minDonations value
        var helperProjectList = projects.map(p => {
            const projectObject = {
                id: p.id,
                name: p.name,
                target: p.target,
                minDonations: 0,
                sum: 0,
                started: false
            }
            return projectObject
        })

        for (let p = 0; p < helperProjectList.length; p++) {
            for (let d = 0; d < donations.length; d++) {
                if (donations[d].target === helperProjectList[p].id) {
                    helperProjectList[p].sum += donations[d].sum
                    helperProjectList[p].minDonations += donations[d].sum
                }
            }
        }
        //this cant be on the for loops above for it loops too many times.
        var ut = 0;
        for (let d = 0; d < donations.length; d++) {
            if (donations[d].target === undefined) {
                ut += donations[d].sum
            }
        }

        setProjectDonations(helperProjectList)
        setUnTargetedDonationsSum(ut)
    }, [projects, donations])

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm pt-4">
                    <Donations donations={allDonationsSum} targetedDonations={unTargetedDonationsSum} />

                    {(successTargetMessage && <Alert variant="success">      {successTargetMessage}    </Alert>)}
                    {(fundingErrorMessage && <Alert variant="danger">      {fundingErrorMessage}    </Alert>)}

                    <TargetFunds
                        unTargetedDonationsSum={unTargetedDonationsSum} setUnTargetedDonationsSum={setUnTargetedDonationsSum} 
                        setProjectDonations={setProjectDonations} projectDonations={projectDonations}
                        setFundingErrorMessage={setFundingErrorMessage}
                        setSuccessMessage={setSuccessTargetMessage}
                    />
                    {(successStartMessage && <Alert variant="success">      {successStartMessage}    </Alert>)}
                    {(startingErrorMessage && <Alert variant="danger">      {startingErrorMessage}    </Alert>)}

                    <StartProject
                        projectDonations={projectDonations}
                        setProjectDonations={setProjectDonations}
                        setStartingErrorMessage={setStartingErrorMessage}
                        setSuccessMessage={setSuccessStartMessage}
                    />
                </div>
            </div>
            <div className="row">
                <Projects projects={projectDonations} />
            </div>
        </div>
    )
}
export default App