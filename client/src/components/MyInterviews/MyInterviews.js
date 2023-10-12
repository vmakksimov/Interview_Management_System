import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { DataContext } from "../context/DataContext";
import './MyInterviews.css'
import { Interview } from "./Interview/Interview";
import paws from '../../styles/images/paws.png'
import paw from '../../styles/images/paw.png'
import mypets from '../../styles/images/mypets.png'
import { Link } from "react-router-dom";

export const Interviews = () => {

    const { interviews, deleteHandler } = useContext(DataContext);
    const { user } = useContext(AuthContext)

    console.log(interviews.length)
    // const ownerPets = interviews.filter(x => x.owner == user._id)
    console.log(interviews)


    return (
        <article className='daycare-header'>
            <div className="home-content">
                <section className='title-content'>
                    <section className='title-buttons'>
                        <h1>My Pets</h1>
                        <p>Back to <strong><Link to='/'>Home</Link></strong></p>
                    </section>
                    <img src={paws} alt="" />
                </section>
                <section className='image-content'>
                    <img src={mypets} alt="animals" />
                </section>
            </div>

            <div className="personal-pet-section">
                <table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Date For Interview
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Gender
                            </th>
                            
                            <th>
                                Mobile Number
                            </th>
                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>
                    <tfoot>
                        <tr>

                        </tr>
                    </tfoot>
                    <tbody>

                        
                            {interviews.length > 0
                                ? interviews.map(x => <Interview key={x.id} interview={x} deleteHandler={deleteHandler} />)
                                : <span>This user has no interviews yet.</span>
                            }

                     

                        {/* {% endfor %} */}


                    </tbody>
                </table>
            </div>
        </article>
    )
}