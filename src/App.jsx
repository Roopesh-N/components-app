import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import AutoComplete from './pages/autoComplete/AutoComplete'
import Home from './pages/home/Home'


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
