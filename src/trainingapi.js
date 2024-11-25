
const api = import.meta.env.VITE_API_URL;
const trainingApi = `${api}trainings`

export function getTrainings() {
    return fetch(trainingApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetch " + response.statusText)
            }
            return response.json();
        })
}