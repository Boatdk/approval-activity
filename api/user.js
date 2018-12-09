const axios = require('axios')

module.exports = {
    getUser(id){
        let url
        if (id) {
            url = `http://localhost:7777/api/user/${id}`
        }else {
            url = `http://localhost:7777/api/user`
        }
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => console.log(error))
    },
    postUser(body){
        return axios.post('http://localhost:7777/api/user/create', body)
      .then((resp) => {
        // console.log(resp.data[0])
        return resp.data
      })
      .catch(error => console.log(error))
    }
}