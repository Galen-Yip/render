var backend_api = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3334' : 'http://render.oa.com'

var config = {
	backend_api: backend_api
}

exports = module.exports = config;