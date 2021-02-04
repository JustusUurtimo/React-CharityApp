import React from 'react'


const Projects = ({ projects }) => {
    //console.log(projects);
    var allProjects = projects.map(project =>
        <AllProjects key={project.id} project={project} />
    )

    var completedProjects = projects.map(project =>
        <StartedProjects key={project.id} project={project} />)


    return (
        <>
            <div className="col-sm">
                <h2>Suunnitellut projektit</h2>
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                        <tr className="bg-success">
                            <th>Nimi</th>
                            <th>Tavoite</th>
                            <th>Kohdennettu</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allProjects}
                    </tbody>
                </table>
            </div>
            <div className="col-sm">
                <h2>Toteutuneet projektit</h2>
                <table className="table table-striped table-bordered table-condensed table-hover">
                    <thead >
                        <tr className="bg-success">
                            <th>Nimi</th>
                            <th>Käytetty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedProjects}
                    </tbody>
                </table>
            </div>
        </>
    )
}

//creates table fields for the un-started projects
const AllProjects = ({ project }) => {
    const {name, target, sum, started } = project

    if (!started) {
        return (

            <tr>
                <td>{name}</td>
                <td>{target.toLocaleString()}</td>
                <td>{sum.toLocaleString()}</td>
            </tr>

        )
    }
    return (
        <>
        </>
    )

}

//creates table fields for the started projects
const StartedProjects = ({ project }) => {
    const { name, sum, started } = project

    if (started) {
        return (
            <tr>
                <td>{name}</td>
                <td>{sum.toLocaleString()}</td>
            </tr>
        )
    }

    return (
        <>
        </>
    )
}

export default Projects