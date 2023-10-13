import './Interview.css'
import axios from 'axios'
import { useContext } from "react"
import { DataContext } from '../../context/DataContext'
import { AuthContext } from '../../context/AuthContext'

import { useNavigate, useParams } from "react-router-dom"

export const Interview = ({ interview }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const {interviewId} = useParams()
    const { deleteHandler } = useContext(DataContext);

    console.log(interviewId)
    console.log(user)


    const onInterviewClick = () => {
        navigate(`/interview-edit/${interview.id}`)
    }

    const onDelete = () => {
        const confirmation = window.confirm('Are you sure you want to delete this interview?')
        if (confirmation) {
            
            let url = `http://127.0.0.1:8000/interview/update/${interview.id}`;
            axios.delete(url, {
                headers: {
               
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.accessToken)
            })
            .catch(err => console.log(err))
            deleteHandler(interviewId)
            navigate('/')
        }




    }
    return (
        <tr>
            <td data-title='Provider Name'>
                {interview.id}
            </td>
            <td data-title='Provider Name'>
                {interview.candidate_first_name}
            </td>
            <td data-title='E-mail'>
                {interview.candidate_last_name}
                {/* {% endif %} */}
            </td>
            <td data-title='Provider Name'>
                {interview.date_for_interview}
            </td>
            <td data-title='Provider Name'>
                {interview.email}
            </td>
            <td data-title='Provider Name'>
                {interview.gender}
            </td>
            <td data-title='Provider Name'>
                {interview.mobile_number}
            </td>
            <td data-title='Provider Name'>
                {interview.status}
            </td>

            <td className='select'>
                {/* {% if deposit.amount %} */}
                <a className='button' onClick={onInterviewClick}>
                    Modify
                </a>
                {/* {% endif %} */}
            </td>
            <td className='select'>
                {/* {% if deposit.amount %} */}
                <a className='button' onClick={onDelete}>
                    Delete
                </a>
                {/* {% endif %} */}
            </td>
        </tr>
    )
}