import axios from 'axios'

// method to save to localstorage
export const saveProductToStorage = (data) =>{
    try {
        const stringifiedDataToStore = JSON.stringify(data)
        localStorage.setItem('storedProducts', stringifiedDataToStore)
    } catch (error) {
        return undefined
    }
}

// method to load products from localstorage
export const loadProductFromStorage  = () => {
    try {
        const storedProducts = localStorage.getItem('storedProducts')
        if(storedProducts === null){
            return undefined
        }
        return JSON.parse(storedProducts)
    } catch (error) {
        return undefined
    }
}

// method to fetch data from API
export const fetchProductFromApi = () => {
    // returns a promise, will resolve  when called
    return axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
}