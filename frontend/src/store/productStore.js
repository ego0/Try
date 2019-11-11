// import mobx
import { observable, action } from 'mobx'
// import axios(http request)
import axios from 'axios'
const productStore = observable({
    products: [],
    loading: false,
    status: '',
    // action for get data product
    fetchProduct: action(() => {
        productStore.loading = true
        axios.get('http://localhost:3000/api/products')
        .then(res => {
            productStore.products = res
            productStore.loading = false
        })
        .catch(err => {
            console.log(err)
            productStore.loading = false
        })
    }),
    updateProduct: action((payload, id) => {
        console.log(payload)
        productStore.loading = true
        axios.post('http://localhost:3000/api/products/'+id+'/update', payload)
        .then(res => {
            productStore.loading = false
            productStore.status = 'Success update'
        })
        .catch(err => {
            console.log(err)
            productStore.loading = false
            productStore.status = err
        })
    }),
    removeProduct: action((id) => {
        productStore.loading = true
        axios.get('http://localhost:3000/api/products/'+id)
        .then(res => {
            productStore.loading = false
            productStore.status = 'Success delete'
        })
        .catch(err => {
            console.log(err)
            productStore.loading = false
            productStore.status = err
        })
    })
})
export const store = productStore