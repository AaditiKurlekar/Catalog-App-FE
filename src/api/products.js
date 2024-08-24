import axios from "axios"

const baseUrl = "https://catalog-app-delta.vercel.app/api/products"
export const getProducts = async (filters, sort, page) => {


    // Generate the query string
    let queryString = Object.keys(filters, sort)
        .filter(key => filters[key] !== null && filters[key] !== undefined)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
        .join('&');
    queryString = queryString + `&sort_by=${sort}&page=${page}&limit=12`

    // Combine base URL with the query string
    const url = `${baseUrl}?${queryString}`;

    try {
        let response = await axios.get(url)
        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteAllProducts = async () => {


    try {
        let response = await axios.delete(baseUrl)
        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const uploadProducts = async (formData) => {

    try {
        let response = await axios.post(baseUrl, formData)
        return response
    }
    catch (err) {
        console.log(err)
    }
}