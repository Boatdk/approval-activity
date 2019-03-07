const axios = require('axios');

module.exports = {
    getFile(id) {
        let url
        if (id) {
            url = `http://localhost:7777/api/images/${id}`
        } else {
            url = `http://localhost:7777/api/images`
        }
        return axios
            .get(url)
            .then(res => res.data)
            .catch(error => console.log(error))
    },
    postFile(body) {
        return axios.post('http://localhost:7777/api/images/create', body)
            .then((resp) => {
                // console.log(resp.data[0])
                return resp.data
            })
            .catch(error => console.log(error))
    },
    deleteFile(body) {
        return axios.post('http://localhost:7777/api/images/delete', body)
            .then((resp) => {
                return resp.data
            })
            .catch(error => console.log(error))
    },
    putFile(body) {
        return axios.post('http://localhost:7777/api/images/update', body
            )
            .then((resp) => {
                return resp.data

            }).catch(error => console.log(error))
    }
};