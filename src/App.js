import { Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import Layout from './components/Layout';
import AllUsers from './pages/AllUsers';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';





function App() {
  return<ToastContextProvider>
          <AuthContextProvider>
            <Layout>
              <Routes >
              <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/users' element={<AllUsers />}/>
                <Route path='*' element={<PageNotFound />}/>
              </Routes>
            </Layout>
          </AuthContextProvider>   
        </ToastContextProvider>
}

export default App;
