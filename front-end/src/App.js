import './app.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Announcement from './components/Announcement/Announcement';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Success from './components/Success/Success';

const Layout = () => {
  return (
    <div className='App'>
      <Announcement />
      <Navbar />
      <Outlet />
      <Footer />
    </div> 
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products/:id',
        element: <Products />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/success',
        element: <Success />
      }
    ]
  }
])


function App() {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
