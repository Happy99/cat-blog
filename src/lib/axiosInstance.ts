//TODO: think about implementing Zod validation or smthin similiar

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const createAxiosInstance = (setup: AxiosRequestConfig): AxiosInstance => {
  return axios.create(setup)
}

const setupInterceptor = (instance: AxiosInstance) => {
  console.log('_____ instance.ts - setupInterceptor - instance')

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
            console.error('Unauthorized:', data)
            return { code: data.code, message: data.message }
          case 403:
            console.error('Forbidden:', data)
            return { code: data.code, message: data.message }
          default:
            console.error('Error:', data)
        }
      } else if (error.request) {
        // no response :(((
        console.error('No response received:', error.request)
      } else {
        // something went wrong :D
        console.error('Error setting up request:', error.message)
      }

      return Promise.reject(error)
    }
  )
}

// Since APPLIFTING documentation says I can expose API key, I will be doing simple GETS
// without need of calling Next.js API routes
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
