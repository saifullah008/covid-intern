import axios  from 'axios';

const ax=axios.create({
    baseURL:`https://api.covid19api.com/`
});
export default ax;