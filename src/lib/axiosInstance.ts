//TODO: think about implementing Zod validation or smthin similiar

import axios from 'axios'

// instance creation
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPLIFTING_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_APPLIFTING_API_KEY,
  },
})

axiosInstance.interceptors.request.use(
  config => {
    // console.log('_____ axiosInstance.ts - REQUEST use - config', config)
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
axiosInstance.interceptors.response.use(
  response => {
    // console.log('_____ axiosInstance.ts - RESPONSE use - response', response)
    return response
  },
  error => {
    if (error.response) {
      // if response is not 200, handle error
      const { status, data } = error.response

      switch (status) {
        case 400:
          console.error('Bad Request:', data)
          return data.message
        case 401:
          console.error('Unauthorized:', data)
          // TODO: handle unauthorized (e.g., redirect to login)
          break
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

export default axiosInstance
