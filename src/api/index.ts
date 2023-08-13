import axios from "axios"

export const API_URL = "http://localhost:3333/api"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})
