
//used to validate the target which the user has wanted to fund
export const validateTarget = (unTargetedDonationsSum, targetAmount, projectDonations, targetName, setProjectDonations, setUnTargetedDonationsSum, setFundingErrorMessage, setSuccessMessage) => {

    //first we check that we can afford the funding
    if (0 <= (unTargetedDonationsSum - (parseInt(targetAmount)))) {

        //find the index of the project
        const foundIndex = projectDonations?.findIndex(project => project.name === targetName);

        //then we check that the project which the user has input exists
        if (foundIndex !== -1) {

            //then we check that the project has not started yet
            if (!projectDonations[foundIndex].started) {

                //then we make sure that the target and the project on the index are same
                if (projectDonations[foundIndex].name === targetName) {
                    //shallow temp array
                    let tempProjectArray = [...projectDonations]
                    //temp project
                    let tempProject = { ...tempProjectArray[foundIndex] }

                    //if the user has input a negative number, we make sure that the project has enough unTargeted funds for removal
                    if (parseInt(tempProject.sum) + parseInt(targetAmount) >= parseInt(tempProject.minDonations)) {
                        tempProject.sum = parseInt(tempProject.sum) + parseInt(targetAmount);
                        tempProjectArray[foundIndex] = tempProject;

                        setProjectDonations(tempProjectArray);

                        setUnTargetedDonationsSum(unTargetedDonationsSum - parseInt(targetAmount));
                        setSuccessMessage("Rahoituksen lisääminen onnistui!")
                        setTimeout(() => { setSuccessMessage(null) }, 5000)

                    } else {
                        let message = "Et voi vähentää projektilta, kuin kohdetamattomia varoja. Projektilla on: "
                            + (parseInt(tempProject.sum) - parseInt(tempProject.minDonations))
                            + "€ kohdentamattomia varoja"
                        setFundingErrorMessage(message)
                        setTimeout(() => { setFundingErrorMessage(null) }, 5000)
                    }
                }
            } else {
                setFundingErrorMessage("Et voi vähentää, tai lisätä aloitetun projektin varoja")
                setTimeout(() => { setFundingErrorMessage(null) }, 5000)
            }
        } else {
            setFundingErrorMessage("Onhan projektin nimi oikein kirjoitettu?")
            setTimeout(() => { setFundingErrorMessage(null) }, 5000)
        }

    } else {
        setFundingErrorMessage("Kohdentamattomia varoja ei ole tarpeeksi")
        setTimeout(() => { setFundingErrorMessage(null) }, 5000)
    }
}

export const validateStart = (projectDonations, setStartingErrorMessage, startProject, setProjectDonations, setSuccessMessage) => {

    //first we find the index of the project we want to start
    const foundIndex = projectDonations?.findIndex(project => project.name === startProject);
    //if the project exists we continue
    if (foundIndex !== -1) {
        //we make sure that the project is not already started
        if (!projectDonations[foundIndex].started) {

            //we make sure that the project has enough funding
            if (projectDonations[foundIndex].sum >= projectDonations[foundIndex].target) {
                //shallow temp array
                let tempProjectArray = [...projectDonations]
                //temp project
                let tempProject = { ...tempProjectArray[foundIndex] }
                tempProject.started = true
                tempProjectArray[foundIndex] = tempProject;
                setProjectDonations(tempProjectArray);
                setSuccessMessage("Projektin aloittaminen onnistui!")
                setTimeout(() => { setSuccessMessage(null) }, 5000)
            } else {
                setStartingErrorMessage("Projektilta puuttuu rahaa")
                setTimeout(() => { setStartingErrorMessage(null) }, 5000)
            }
        } else {
            setStartingErrorMessage("Olet jo aloittanut tämän projektin")
            setTimeout(() => { setStartingErrorMessage(null) }, 5000)
        }
    } else {
        setStartingErrorMessage("Onhan projektin nimi oikein kirjoitettu?")
        setTimeout(() => { setStartingErrorMessage(null) }, 5000)
    }
}