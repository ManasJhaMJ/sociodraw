import React from 'react'
import hero from '../assets/hero.png'
import { Link } from 'react-router-dom'
import art from '../assets/icons/art.png'
import blank from '../assets/icons/blank.png'
import pencil from '../assets/icons/pencil.png'
import restart from '../assets/icons/restart.png'

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
                <div className="feature">
                    <img src={pencil} alt="pencil" />
                    <h3>Real-time Drawing</h3>
                    <p>
                        Draw together in real-time with your friends and family.
                    </p>
                </div>
                <div className="feature">
                    <img src={art} alt="art" />
                    <h3>Multiple Colors</h3>
                    <p>
                        Choose from multiple range of colors to draw on the canvas.
                    </p>
                </div>
                <div className="feature">
                    <img src={art} alt="art" />
                    <h3>No Undo or Restart</h3>
                    <p>
                        Once you draw something, it is final! So think before you draw.
                    </p>
                </div>
                <div className="feature">
                    <img src={art} alt="art" />
                    <h3>Reset Daily</h3>
                    <p>
                        The canvas resets daily. Get a fresh canvas to draw on every day.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home