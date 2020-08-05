import axios from "axios";
export default axios.create({
baseURL: "http://localhost:3000/api/v1/",
headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
}
});