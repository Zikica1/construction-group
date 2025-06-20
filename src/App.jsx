import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import LayoutMain from './components/LayoutMain';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogCardDetail from './components/blogs/BlogCardDetail';
import Contact from './pages/Contact';
import PortfolioCardDetail from './components/projects/PortfolioCardDetail';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Admin from './pages/Admin';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import MessageDetails from './pages/MessageDetails';
import PersistLogin from './components/PersistLogin';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='projects' element={<Projects />} />
          <Route path='projects/:id' element={<PortfolioCardDetail />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<BlogCardDetail />} />
          <Route path='contact' element={<Contact />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[500]} />}>
              <Route path='admin' element={<Admin />} />
              <Route path='admin/:id' element={<MessageDetails />} />
            </Route>
          </Route>

          <Route path='unauthorized' element={<Unauthorized />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
