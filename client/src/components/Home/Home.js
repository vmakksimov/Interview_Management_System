import './Home.css'
import animals from '../../styles/images/kindpng_2140500.png'
import paw from '../../styles/images/paw.png'
import { Link } from 'react-router-dom'

export const Home = () => {


    return (
        <>
            <article className='daycare-header'>
                <div className="home-content">
                    <section className='title-content'>
                        <section className='title-buttons'>
                            <h1>Home Page</h1>
                            <h2>Your <strong>Pet</strong> is Part of Our Family</h2>
                            <button className='learn'>Learn More</button>
                            <button className='reservation'>Make a Reservation</button>
                        </section>
                        <img src={paw} alt="" />
                    </section>
                    <section className='image-content'>
                        <img src={animals} alt="animals" />
                    </section>
                </div>
            </article>
            <article className='daycare-content'>
                <section className='box-service-1'>
                    <i className="fa fa-home" aria-hidden="true" id='house'></i>
                    <h1>Daycare</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <Link to={''}><button>More Details</button> <i className="fa-solid fa-arrow-right fa-beat-fade"></i></Link>
                </section>
                <section className='box-service-2'>
                    <i className="fa-solid fa-dog fa-beat-fade" id='dog'></i>
                    <h1>Grooming</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <button>More Details</button> <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
                </section>
                <section className='box-service-3'>
                    <i className="fa-brands fa-shopify fa-bounce" id='shop'></i>
                    <h1>Shop</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <button>More Details</button> <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
                </section>
                <section className='box-service-4'>
                    <i className="fa-solid fa-hotel"></i>
                    <h1>Boarding</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <button>More Details</button> <i className="fa-solid fa-arrow-right fa-beat-fade" ></i>
                </section>
                <section className='box-service-5'>
                    <i className="fa-solid fa-shield-dog"></i>
                    <h1>Veterinary</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <button>More Details</button> <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
                </section>
            </article>
            <article className='daycare-us'>
                <div className='choose'>
                    <h1>Why Choose Us</h1>
                    <p>Enjoy Your Holiday We Can Keep Them Happy Your Pet Our Priority Happy Pets, Happy Humans We Are The Best Of This Country We Are Always Ready For Your Pet.</p>
                </div>
                <div className='points'>
                    <section className='first-point'>
                        <i className="fa-solid fa-notes-medical"></i>
                        <h1>Personalized Care</h1>
                        <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                    </section>
                    <section className='second-point'>
                        <i className="fa-sharp fa-solid fa-people-group"></i>
                        <h1>Trusted Team</h1>
                        <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                    </section>
                    <section className='third-point'>
                    <i className="fa-solid fa-face-smile"></i>
                        <h1>Piece of Mind</h1>
                        <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                    </section>
                    <section className='fourth-point'>
                        <i className="fa-solid fa-tree"></i>
                        <h1>Nice Environment</h1>
                        <p>Pellentesque maximus augue orci, quis congue purus iaculison</p>
                    </section>
                </div>
            </article>
        </>
    )
}