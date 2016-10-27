export default class Config {

    static HTTP_PORT = process.env.PORT || process.env.HTTP_PORT
    static TUMBLR_SECRET_KEY = process.env.TUMBLR_SECRET_KEY
    static TUMBLR_CONSUMER_KEY = process.env.TUMBLR_CONSUMER_KEY

    static get nodeEnv() {
        return process.env.NODE_ENV || 'local'
    }

    static get httpPort() {
        return this.HTTP_PORT
    }

    static set httpPort(value) {
        return this.HTTP_PORT = value
    }

}
