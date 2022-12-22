import https from "https"
import {
    Criteria,
    HttpRequestOptions,
    HttpRequestResult,
} from "./types/http"

export class Http {

    constructor() { }

    /**
     * https request
     * 
     * @param url - example: https://example.com/path?something=true
     * @param options 
     * @returns 
     */
    async request(
        url: string,
        options?: HttpRequestOptions
    ): Promise<HttpRequestResult> {

        let parseURL = new URL(url)
        
        let criteria: Criteria = {
            hostname: parseURL.hostname,
            path: parseURL.pathname,
            hash: parseURL.hash,
            search: parseURL.search,
        }

        if (options?.headers) {
            criteria.headers = options.headers
        }

        if (options?.method) {
            criteria.method = options.method
        }
        
        return new Promise((resolve, reject) => {

            const req = https.request({ ...criteria }, (res) => {

                let resBuffer: Buffer[] = []
                let data: JSON | Buffer | string

                res.on('data', (chunk: Buffer) => {
                    resBuffer.push(chunk)
                })

                res.on('end', () => {
                    try {
                        
                        data = Buffer.concat(resBuffer)

                        let contentType = res.headers['content-type']
                        if (contentType) {
                            if (contentType.includes("application/json")) {
                                data = data.toString()
                                data = JSON.parse(data)
                            }
                        }

                        resolve({
                            data,
                            statusCode: res.statusCode,
                            statusMessage: res.statusMessage,
                            headers: res.headers,
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            })

            if (options?.body) {
                req.write(options.body)
            }

            req.on('error', (error) => {
                reject(error.message)
            })

            req.end()
        })
    }

}