import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//pages
import HomePage from "./pages/home"
import InventoryPage from "./pages/inventory"
import OrdersPage from "./pages/orders"
import MenuPage from "./pages/menu"
import RootLayout from './layouts/root-layout'
import "./App.css"
import ProfilePage from './pages/profile'
import SignIn from './pages/sign-in'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='inventory' element={<InventoryPage/>} />
      <Route path='orders' element={<OrdersPage/>} />
      <Route path='menu' element={<MenuPage/>} />
      <Route path='profile' element={<ProfilePage/>} />
      <Route path='signin' element={<SignIn/>} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
