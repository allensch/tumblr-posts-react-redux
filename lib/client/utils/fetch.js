
const SEND_JSON_ACCEPT_JSON = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

export default class FetchUtils {

	static fetch(path, opts = {}) {
		return fetch(path, opts)
			.then(FetchUtils.status)
			.then(FetchUtils.parse)
	}

	static parse(response) {
		try {
			return response.json()
		} catch (e) {
			throw e
		}
	}

	static status(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			throw new Error(response.body)
		}
	}

	static getJSON(path) {
		return FetchUtils.fetch(path)
	}

	static postJSON(path, data) {
		return FetchUtils.fetch(path, {
			headers: SEND_JSON_ACCEPT_JSON,
			body: JSON.stringify(data),
			method: 'post'
		})
	}

}
