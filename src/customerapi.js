
const api = import.meta.env.VITE_API_URL;
const customerApi = `${api}customers`

export function getCustomers() {
    return fetch(customerApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fecth " + response.statusText)
            }
            return response.json();
        })
}
    