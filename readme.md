Pure https request (like `fetch` or `axios`) that uses node:https that written in typescript

### Install
`npm install @mhjb/https`

### Supported Methods
```
GET
POST
PUT
DELETE
OPTIONS
PATCH
COPY
```
and others


### Example
```js
import { Http } from "@mhjb/https"

Run()
async function Run {
    let http = new Http()
    let req = await http.request("https://example.com/path?something=true")

    let data = req.data
    let statusCode = req.statusCode
    let statusMessage = req.statusMessage
    let headers = req.headers
}
```

OR
```js
const { Http } = require("@mhjb/https")

let http = new Http()
http.request("https://example.com/path?something=true").then(req => {
    
    let data = req.data
    let statusCode = req.statusCode
    let statusMessage = req.statusMessage
    let headers = req.headers
})
```