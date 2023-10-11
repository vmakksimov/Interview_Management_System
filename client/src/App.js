import logo from './logo.svg';
import './App.css';
import './styles/css/styles.css'
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { useEffect, useState } from 'react';
// import * as petsService from './services/petsService'
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './components/context/AuthContext';
import { DataContext } from './components/context/DataContext';
import { Logout } from './components/Logout/Logout';
import { CreateInterview } from './components/CreateInterview/CreateInterview';

function App() {
  const [user, setAuth] = useLocalStorage('auth', {})
  const [interviews, setInterview] = useState([])
  const [itemCount, setItemCount] = useState(1);

  const userLogin = (authData) => {
    setAuth(authData)
  }

  const userLogout = () => {
    setAuth({})
  }

  const addInterviewHandler = (interviewData) => {
    setInterview(state => [
      ...state,
      interviewData
    ])
  }


  // useEffect(() => {
  // 	petsService.getPets()
  // 		.then(res => setPet(Object.values(res)))

  // }, [])

  return (
    <AuthContext.Provider value={{ user, itemCount, userLogin, userLogout, setItemCount }}>
      <div className="App">
        <Header />
        <DataContext.Provider value={{ interviews, setInterview, addInterviewHandler }}>
          <div className='main-app'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/create-interview' element={<CreateInterview />} />
              {/* <Route path='/mypets' element={<MyPets />} />
							<Route path='/create-pet' element={<CreatePet />} /> */}

            </Routes>
          </div>
        </DataContext.Provider>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}


export default App;
