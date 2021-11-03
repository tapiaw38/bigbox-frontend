import axios from "axios";

const bigboxApi = axios.create({
    baseURL: "https://json-biglifeapp.herokuapp.com/"
})


export default bigboxApi