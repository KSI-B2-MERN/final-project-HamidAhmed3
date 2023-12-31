import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/protected';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoggedInUser } from './features/auth/authSlice';
import {fetchItemsByUserIdAsync} from '../src/features/cart/cartSlice'
import Checkout from './pages/Checkout';
import  PageNotFound  from './pages/Error404';
import OrderSuccessPage from './pages/OrderSucces';
import Logout from './features/auth/components/Logout';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage copy'; 
import ProtectedAdmin from './features/auth/components/protectedAdmin'
import ProductForm from './features/admin/ProductForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
             <Home></Home>
             </Protected>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
             <AdminHome></AdminHome>
             </ProtectedAdmin>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <Protected>
              <CartPage></CartPage>
              </Protected>
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: <Protected><AdminProductDetailPage></AdminProductDetailPage>
              </Protected>
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><ProductDetailPage></ProductDetailPage>
              </ProtectedAdmin>
  },
  {
    path: "/admin/add-product",
    element: <ProtectedAdmin><ProductForm></ProductForm>
              </ProtectedAdmin>
  },
  {
    path: '/order-success/:id',
    element: 
      <OrderSuccessPage></OrderSuccessPage>

  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  }
]);


function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=> {
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))}
    },[dispatch, user])

  return (
  <RouterProvider router={router} />
  );
}

export default App;
