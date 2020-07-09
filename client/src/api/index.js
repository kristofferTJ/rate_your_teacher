import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

//export const insertMovie = payload => api.post(`/movie`, payload)
//export const getAllMovies = () => api.get(`/movies`)
export const getAllTeachers = () => api.get('/teachers')
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    //insertMovie,
    //getAllMovies,
    getAllTeachers
    //updateMovieById,
    //deleteMovieById,
    //getMovieById,
}

export default apis