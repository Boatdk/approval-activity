const axios = require('axios')
var localhost = `http://localhost:7777/api/activity`
var ip = 'http://128.199.241.168:7777'
module.exports = {
    getActivity(id){
        let url
        if (id) {
            url = `/api/activity/${id}`
        }else {
            url = `/api/activity`
        }
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => console.log(error))
    },
    postActivity(body){
        return axios.post('http://128.199.147.194:7777/api/activity', body)
      .then((resp) => {
        return resp.data
      })
      .catch(error => console.log(error))
    },
    putActivity(body,id){
        return axios.put('http://128.199.147.194:7777/activity/${id}', body)
      .then((resp) => {
        return resp.data
      })
      .catch(error => console.log(error))
    }
}