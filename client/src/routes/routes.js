import Home from '../components/home/Home';
import Customers from '../components/customers/Customers';
import Tools from '../components/tools/Tools';
import Layout from '../components/Layout';
import Orders from '../components/orders/Orders';

const states = [
  {
    name : 'layout',
    component : Layout
  },
  {
    name : 'layout.home',
    url  : '/home/',
    component : Home
  },
  {
    name : 'layout.tools',
    url  : '/home/tools',
    component : Tools
  },
  {
    name : 'layout.customers',
    url  : '/home/customers',
    component : Customers
  },
  {
    name : 'layout.orders',
    url  : '/home/orders',
    component : Orders
  }
]

export default states
