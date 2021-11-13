Run `docker-compose up` in the root folder. 

You can access the app through the following url: `http://localhost:3030`.

Routes:

`GET` `/get-title/?asin=B000RL5C0K`

`POST` `/get-title-scheduled` with JSON body `{ asin: 'B000RL5C0K, crontab '* * * * *' }`

`POST` `/stop`

There is an error with the queue that occurs randomly (actually every first try to send an HTTP request to the `engine` app);

`ERROR [Server] There is no matching event handler defined in the remote service. Event pattern:`

I was in a hurry so could not find how to solve this.

<strong>Please, just try to send your request again if the error occurs.</strong>
