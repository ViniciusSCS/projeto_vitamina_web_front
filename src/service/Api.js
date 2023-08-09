import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'http://localhost:8000/api'
});

const apiVitaminaWeb = {

  login(user) {
    return apiRequest.post('/login', user)
  },

  cadastrar(user) {
    return apiRequest.post('/cadastrar', user)
  },

  selectCliente() {
    return apiRequest.get('/user/clientes')
  },

  getProducts() {
    return apiRequest.get('/product/listar')
  },

  postProducts(product) {
    return apiRequest.post('/product/cadastrar', product)
  },

  putProducts(id, product) {
    return apiRequest.put(`/product/atualizar/${id}`, product)
  },

  showProducts(id) {
    return apiRequest.get(`/product/editar/${id}`)
  },

  selectProducts() {
    return apiRequest.get('/product/select/')
  },

  postSalesOpportunity(salesOpportunity) {
    return apiRequest.post('/sales-opportunity/cadastrar', salesOpportunity)
  },

  getSalesOpportunity() {
    return apiRequest.get(`/sales-opportunity/listar`)
  },

  showSalesOpportunity(id) {
    return apiRequest.get(`/sales-opportunity/visualizar/${id}`)
  },

  aprovarSalesOpportunity(id) {
    return apiRequest.put(`/sales-opportunity/aprovar/${id}`)
  },

  recusarSalesOpportunity(id) {
    return apiRequest.put(`/sales-opportunity/recusar/${id}`)
  }

}

apiRequest.interceptors.request.use((config) => {
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${sessionStorage.getItem('token')}`}}
})

export {
  apiVitaminaWeb
}
