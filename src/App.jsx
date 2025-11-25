import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import AutoComplete from './pages/autoComplete/AutoComplete'
import Home from './pages/home/Home'
import InfiniteScroll from './pages/InfiniteScroll/InfiniteScroll'
import {PaginationComponent} from './pages/pagination/PaginationComponent'


var appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"autoComplete-typehead",
        element:<AutoComplete/>
      },
      {
        path:"infinite-scroll",
        element:<InfiniteScroll/>
      },
      {
        path:"pagination",
        element:<PaginationComponent/>
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App
