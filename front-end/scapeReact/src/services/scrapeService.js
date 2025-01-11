import axios from "axios";

const url = 'http://localhost:8000'

const getMultipleUrls = async (data) => {
    const response = await axios.post(`${url}/scrape-multiple`, data , {
      headers: {
        'Content-Type': 'application/json'
      }})
    return response.data
}

export default {getMultipleUrls};