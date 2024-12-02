
const api = import.meta.env.VITE_API_URL;
const customerApi = `${api}customers`

export function getCustomers() {
    return fetch(customerApi)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fecth " + response.statusText)
            return response.json();
        })
}
    
export function deleteCustomer(url) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if(!response.ok) 
                throw new Error("Error in delete " + response.statusText)
            return response.json();
        })
}

export function saveCustomer(newCustomer) {
    return fetch(customerApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in saving " + response.statusText)
        return response.json();
    })
}

export function updateCustomer(url, customer) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if(!response.ok) 
            throw new Error("Error in saving " + response.statusText)
        return response.json();
    })
}