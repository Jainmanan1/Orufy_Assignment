import AppRouter from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={10000} />
    </>
  );
}

export default App
