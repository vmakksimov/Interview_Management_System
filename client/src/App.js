import logo from './logo.svg';
import './App.css';
import './styles/css/styles.css'
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { useEffect, useState } from 'react';
import * as userService from './services/userService'
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './components/context/AuthContext';
import { DataContext } from './components/context/DataContext';
import { Logout } from './components/Logout/Logout';
import { CreateInterview } from './components/CreateInterview/CreateInterview';
import { Interviews } from './components/MyInterviews/MyInterviews';
import { EditInterview } from './components/EditInterview/EditInterview';



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

	const editInterviewHandler = (interviewId, InterviewData) => {
		setInterview(state => state.map(x => x.id == interviewId ? InterviewData : x))
	}

	const deleteHandler = (interviewId) => {
		setInterview(interviews.filter(x => x._id !== interviewId))
	}

	useEffect(() => {
		userService.getInterviews()
			.then(res =>

				setInterview(Object.values(res)))

	}, [])

	return (
		<AuthContext.Provider value={{ user, itemCount, userLogin, userLogout, setItemCount }}>
			<div className="App">
				<Header />
				<DataContext.Provider value={{ interviews, setInterview, addInterviewHandler, editInterviewHandler, deleteHandler }}>
					<div className='main-app'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route path='/logout' element={<Logout />} />
							<Route path='/create-interview' element={<CreateInterview />} />
							<Route path='/interviews' element={<Interviews />} />
							<Route path='/interview-edit/:interviewId' element={<EditInterview />} />



						</Routes>
					</div>
				</DataContext.Provider>
				<Footer />
			</div>
		</AuthContext.Provider>
	);
}


export default App;
