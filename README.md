#Tumblr search blogs/posts challenge

###Made for Headspace

#### Built using React/Redux

The Form class I made for another prototype project I was working on, in case you wonder :)

##Running Locally

You will need to create a `local.json` file placed at the root directory that looks like this:

```
{

    "DEBUG": "*,-babel,-express:*",
    "HTTP_PORT": 8800,
    "NODE_ENV": "development",
    "TUMBLR_CONSUMER_KEY": "",
    "TUMBLR_SECRET_KEY": ""

}
```
Then you can
```
npm run start-prod
```

It will create both client and server builds via Babel/Browserify and start the local server on the `HTTP_PORT` you specified.
