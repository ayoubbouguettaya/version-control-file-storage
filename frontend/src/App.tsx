import ChangesPage from './components/ChangesPage/ChangesPage';
import HomeComponent from './components/Home'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeComponent />,
    },
    {
      path: "/show/:commitHash",
      element: <ChangesPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
