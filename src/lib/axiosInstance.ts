import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import { sessionService } from './auth/session'
const createAxiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config)
}

const setupInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      // TODO: think how to devide FE a BE intereceptor so BE could take access_token from session
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // resnponse handler
  instance.interceptors.response.use(
    response => {
      // console.log('_____ instance.ts - RESPONSE use - response', response.data)
      // console.log('_____ instance.ts - RESPONSE use - response', response.status)
      return response
    },
    error => {
      if (error.response) {
        // if response is not 200, handle error
        const { status, data } = error.response
        // console.log('_____ instance.ts - RESPONSE use - status & data', status, data)

        // should be all APPLIFTING API errors - think how to handle them with Next Res/Req together
        switch (status) {
          case 400:
            console.error('AXIOS INSTANCE: Bad Request:', data)
            return { code: data.code, message: data.message }
          case 401:
            console.error('AXIOS INSTANCE: Unauthorized:', data)
            return { status }
          case 403:
            console.error('AXIOS INSTANCE: Forbidden:', data)
            return { code: data.code, message: data.message }
          case 404:
            console.error('AXIOS INSTANCE: Not Found:', data)
            return { code: status, message: 'Not Found' }
          default:
            console.error('Error:', data)
        }
      } else if (error.request) {
        console.error('No response received:', error.request)
      } else {
        console.error('Error setting up request:', error.message)
      }

      return Promise.reject(error)
    }
  )
}

// all my FE GETs are comming from ISR, so API key is hidden behind server
const frontendRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': process.env.APPLIFTING_API_KEY,
  },
}

const backendRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.APPLIFTING_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': process.env.APPLIFTING_API_KEY,
  },
}

// instance creation
export const axiosFrontendInstance = createAxiosInstance(frontendRequestConfig)
export const axiosBackendInstance = createAxiosInstance(backendRequestConfig)

setupInterceptor(axiosFrontendInstance)
setupInterceptor(axiosBackendInstance)
