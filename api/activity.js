const axios = require('axios')

module.exports = {
    getActivity(id){
        let url
        if (id) {
            url = `http://localhost:7777/api/activity/${id}`
        }else {
            url = `http://localhost:7777/api/activity`
        }
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => console.log(error))
    },
    postActivity(body){
        return axios.post('http://localhost:7777/api/activity/create', body)
      .then((resp) => {
        // console.log(resp.data[0])
        return resp.data
      })
      .catch(error => console.log(error))
    }
}