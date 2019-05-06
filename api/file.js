const axios = require('axios');

module.exports = {
    getFile(id) {
        let url
        if (id) {
            url = `http://128.199.147.194:7777/api/file/${id}`
        } else {
            url = `http://128.199.147.194:7777/api/file`
        }
        return axios
            .get(url)
            .then(res => res.data)
            .catch(error => console.log(error))
    },
    postFile(body) {
        return axios.post('http://128.199.147.194:7777/api/file/create', body)
            .then((resp) => {
                // console.log(resp.data[0])
                return resp.data
            })
            .catch(error => console.log(error))
    },
    deleteFile(body) {
        return axios.post('http://128.199.147.194:7777/api/file/delete', body)
            .then((resp) => {
                return resp.data
            })
            .catch(error => console.log(error))
    },
    putFile(body) {
        return axios.post('http://128.199.147.194:7777/api/file/update', body
            )
            .then((resp) => {
                return resp.data

            }).catch(error => console.log(error))
    }
};