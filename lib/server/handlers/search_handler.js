import Debug from 'debug'
import Tumblr from 'tumblr.js'
import Config from '../config'

const debug = Debug('search-handler')
const client = Tumblr.createClient({
    credentials: {
        consumer_key: Config.TUMBLR_CONSUMER_KEY,
        consumer_secret: Config.TUMBLR_SECRET_KEY
    },
    returnPromises: true
})

export default class SearchHandler {

    static async search(request, response) {
        var result, options, posts
        const { name, tag } = request.body
        try {
            if (name && name.length) {
                if (tag && tag.length) {
                    options = { tag }
                }
                result = await client.blogPosts(name, options)
                posts = result.posts
                delete result.posts
                debug('response OK', result)
            } else if (tag) {
                result = await client.taggedPosts(tag)
                posts = result
            } else {
                response.status(400).send('A name or tag value is required')
                return
            }
            response.json(posts)
        } catch(error) {
            response.status(400).send(error)
            debug('response ERROR', error)
        }
    }

}
