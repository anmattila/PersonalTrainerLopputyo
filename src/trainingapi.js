
const api = import.meta.env.VITE_API_URL;
const trainingApi = `${api}trainings`
const trainingsWC = `${api}gettrainings`

export function getTrainings() {
    return fetch(trainingApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch " + response.statusText)
            }
            return response.json();
        })
}

export function getTrainingsWithCustomers() {
    return fetch(trainingsWC)
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in fetch " + response.statusText)
            }
            return response.json();
        })
}

export function deleteTraining(url) {
    return fetch(trainingApi + "/" + url, { method: "DELETE" })
        .then(response => {
            if(!response.ok)
                throw new Error("Error in delete " + response.statusText)
            return response.json();
        })
}

export function saveTrainingToCustomer(url, newTraining) {
    return fetch(trainingApi, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...newTraining, customer: url})
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Erron in saving " + response.statusText)
        return response.json();
    })
}