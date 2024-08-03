import React from 'react'
import hero from '../assets/hero.png'
import { Link } from 'react-router-dom'
import art from '../assets/icons/art.png'
import blank from '../assets/icons/blank.png'
import pencil from '../assets/icons/pencil.png'
import chat from '../assets/icons/chat.png'

function Home() {
    return (
        <>
            <section id='home'>
                <div className="home-text">
                    <h1>SocioDraw</h1>
                    <p>Draw together in real-time!</p>
                    <span className='cta-group'>
                        <a href='#features' className='cta'>Learn</a>
                        <a href='/draw' className='cta'>Draw</a>
                    </span>
                </div>
                <div className="hero">
                    <img src={hero} alt="hero" />
                </div>
            </section>
            <section id='features'>
                <h2>How to play?</h2>
                <div className="features">
                    <div className="feature">
                        <img src={pencil} alt="pencil" />
                        <h3>Real-time<br />Drawing</h3>
                        <p>
                            Draw together in real-time with your friends and family.
                        </p>
                    </div>
                    <div className="feature">
                        <img src={art} alt="art" />
                        <h3>Multiple<br />Colors</h3>
                        <p>
                            Choose from multiple range of colors to draw on the canvas.
                        </p>
                    </div>
                    <div className="feature">
                        <img src={chat} alt="chat" />
                        <h3>Chat & <br />Discuss</h3>
                        <p>
                            Chat with your friends and discuss what to draw.
                        </p>
                    </div>
                    <div className="feature">
                        <img src={blank} alt="blank" />
                        <h3>Reset<br />Weekly</h3>
                        <p>
                            Get a new and fresh canvas to draw on every week.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home