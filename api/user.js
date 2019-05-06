const axios = require('axios')

module.exports = {
    getUser(id){
        let url
        if (id) {
            url = `http://128.199.147.194:7777/api/user/${id}`
        }else {
            url = `http://128.199.147.194:7777/api/user`
        }
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => console.log(error))
    },
    postUser(body){
        return axios.post('http://128.199.147.194:7777/api/user', body)
      .then((resp) => {
        // console.log(resp.data[0])
        return resp.data
      })
      .catch(error => console.log(error))
    }
}