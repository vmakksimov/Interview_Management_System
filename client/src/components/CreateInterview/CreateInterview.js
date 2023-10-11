import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CreateInterview.css'
import axios from 'axios'
import { DataContext } from '../context/DataContext';

export const CreateInterview = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {interview , addInterviewHandler} = useContext(DataContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const interviewData = Object.fromEntries(new FormData(e.target))
        const formData = new FormData(e.target);
        console.log(interviewData)
     

        let url = 'http://127.0.0.1:8000/interview/create/';
        axios.post(url, interviewData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                addInterviewHandler(res)
                navigate('/')
            })
            .catch(err => console.log(err))

       
    }
    return (
        <div className="container-register">
            <div className="title sign">Enter your candidate details below</div>
            <div className="content">
                <form  onSubmit={onSubmit}>
                    <div className="game-details">
                        <div className="input-box">
                            
                            <input type="text" name="candidate_first_name" placeholder="Enter First Name" required />

                        </div>
                        <div className="input-box">
                            
                            <input type="text" name="candidate_last_name" placeholder="Enter Last Name" required />

                        </div>
                        <div className="input-box">
                            
                            <input type="date" name="date_for_interview" placeholder="Enter date" required />

                        </div>
                        
                        <div className="input-box">
                           
                            <input type="text" name="email" placeholder="Enter Email" required />

                        </div>
                        <div className="input-box">
                            
                            <input type="number" name="mobile_number" placeholder="Enter mobile number" required />

                        </div>
                        <div className="input-box">
                            <span className="details">Status</span>
                            <select name="status">
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="input-box">
                            <span className="details">Gender</span>
                            <select name="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                             
                            </select>
                        </div>
                        
                        {/* <div className="input-box">
                            <span className="details"></span>
                            <input type="hidden" name="owner" defaultValue={user._id} />
                        </div> */}
                    </div>

                    <div className="button-book">
                        <input type="submit" value="SUBMIT" />
                    </div>
                </form>
            </div>
        </div>

    )
}