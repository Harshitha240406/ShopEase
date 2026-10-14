import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error(error.response?.data?.message || 'Could not load products. Please check your internet connection.');
  }
};

/**
 * Fetch single product by ID
 * @param {string|number} id Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    if (!response.data) {
      throw new Error('Product not found.');
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to load product details.');
  }
};

/**
 * Fetch all product categories
 * @returns {Promise<Array<string>>} List of category names
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to load categories.');
  }
};

/**
 * Fetch products by specific category
 * @param {string} category Category slug
 * @returns {Promise<Array>} List of category products
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    throw new Error('Failed to load products for this category.');
  }
};

/**
 * Demo login authentication using Fake Store API
 * @param {string} username Demo username (e.g. 'johnd')
 * @param {string} password Demo password (e.g. 'm38rmF$')
 * @returns {Promise<Object>} Response containing token
 */
export const loginApi = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response.data; // { token: '...' }
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(
      error.response?.data?.message || 
      'Invalid credentials. Please verify your demo username and password.'
    );
  }
};

export default {
  getAllProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
  loginApi,
};
