import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../src/pages/home';
import Home1 from '../src/pages/home1';
import Home2 from '../src/pages/home2';
import Home3 from '../src/pages/home3';
import Home4 from '../src/pages/home4';
import Home5 from '../src/pages/home5';
import Home6 from '../src/pages/home6';
import Games from '../src/pages/games';
import Pricing from '../src/pages/pricing';
import Pricing2 from '../src/pages/pricing2';
import Pricing3 from '../src/pages/pricing3';
import Location from '../src/pages/location';
import Knowledgebase from '../src/pages/knowledgebase';
import Faq from '../src/pages/faq';
import Contact from '../src/pages/contact';
import News from '../src/pages/news';
import About from '../src/pages/about';
import Affliate from '../src/pages/affliate';
import Login from '../src/pages/login';
import Register from '../src/pages/register';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const routes = [
  { path: '/', element: <Home /> },
  { path: '/home1', element: <Home1 /> },
  { path: '/home2', element: <Home2 /> },
  { path: '/home3', element: <Home3 /> },
  { path: '/home4', element: <Home4 /> },
  { path: '/home5', element: <Home5 /> },
  { path: '/home6', element: <Home6 /> },
  { path: '/games', element: <Games /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/pricing2', element: <Pricing2 /> },
  { path: '/pricing3', element: <Pricing3 /> },
  { path: '/location', element: <Location /> },
  { path: '/knowledgebase', element: <Knowledgebase /> },
  { path: '/faq', element: <Faq /> },
  { path: '/contact', element: <Contact /> },
  { path: '/news', element: <News /> },
  { path: '/about', element: <About /> },
  { path: '/affliate', element: <Affliate /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

const Navigation = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

function App() {
  return (
    <HelmetProvider>
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
