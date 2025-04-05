import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const createAxiosInstance = (setup: AxiosRequestConfig): AxiosInstance => {
  return axios.create(setup)
}

const setupInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      // console.log('_____ instance.ts - REQUEST use - config', config)
      // TODO: add auth token, it's fetched from /login
      // const token = localStorage.getItem('token')
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // resnponse handler
  instance.interceptors.response.use(
    response => {
      // console.log('_____ instance.ts - RESPONSE use - response', response)
      return response
    },
    error => {
      if (error.response) {
        // if response is not 200, handle error
        const { status, data } = error.response

        // should be all APPLIFTING API errors
        switch (status) {
          case 400:
            console.error('Bad Request:', data)
            return { code: data.code, message: data.message }
          case 401:
            // TODO: think what to do with 401, maybe just redirect to login page
            // should not happen, because X-API-KEY in env, but just in case
            console.error('Unauthorized:', data)
            return { code: data.code, message: data.message }
          case 403:
            console.error('Forbidden:', data)
            return { code: data.code, message: data.message }
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
