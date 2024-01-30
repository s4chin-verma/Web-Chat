import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Login, Home, Register, Chat, ResetPassword, ChangePassword, NotFound } from '@/pages';
import { Toast } from '@/components';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Outlet />
      <Toast />
    </Provider>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'chat', element: <Chat /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'reset-password/:id', element: <ChangePassword /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
