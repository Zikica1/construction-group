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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='projects' element={<Projects />} />
        <Route path='projects/:id' element={<PortfolioCardDetail />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:id' element={<BlogCardDetail />} />
        <Route path='contact' element={<Contact />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
