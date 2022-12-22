import { OutgoingHttpHeaders } from "http"

export interface HttpRequestOptions {
    method?: "GET" | "POST" |  "PUT" |  "DELETE" | "OPTIONS" | "PATCH" | "COPY"
    headers?: OutgoingHttpHeaders
    body?: string
}

export interface Criteria {
    headers?: OutgoingHttpHeaders
    method?: string

    hostname: string
    path: string // its pathname in new URL
    search: string
    hash: string
}

export interface HttpRequestResult {
    data: Buffer | string | JSON
    statusCode?: number
    statusMessage?: string
    headers: object
}