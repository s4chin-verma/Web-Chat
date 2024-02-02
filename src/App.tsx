import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Login, Home, Register, Chat, ResetPassword, ChangePassword, NotFound } from '@/pages';
import { Toast } from '@/components';
import { Header } from './container';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toast />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'reset-password/:id/:token', element: <ChangePassword /> },
    ],
  },
  { path: '/chat', element: <Chat /> },
  { path: '*', element: <NotFound /> },
]);
