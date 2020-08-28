import React, { useEffect } from 'react';
import ConnectRow from '../../assets/4inarow.png';
import './Home.scss';
import { Link } from 'react-router-dom';
import One  from '../../assets/images/one.png';
import Two  from '../../assets/images/two.png';
import Training from '../../assets/images/training.png';
import Online  from '../../assets/images/online.png';
import Aos from 'aos';
import "aos/dist/aos.css";
import Aud from  '../../assets/notify.mp3';

import {ToastsContainer, ToastsStore} from 'react-toasts';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    useEffect(() => {
        Aos.init({duration: 2000});
    }, [])
     
  let audio = new Audio(Aud);
  
    return (
        
        <div className="home-container" >
            <div  data-aos="slide-right"className="home-top">
                <h1>Connect Four!</h1>
                <p>Play with other players around the world</p>
            </div>
            <div className="home-board-container">
                <div className="home-board">
                    <div className="wrapper">
                        <div className="board-top">
                            <Link to ='/player-detail'>
                        <button data-aos="flip-up">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
      <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
      <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
    </svg> 
                               <span>PLAY</span></button></Link>
                            <div>
                                <img data-aos="zoom-in" src={ConnectRow}></img>
                                <span className="ellipse1"></span>
                                <span className="ellipse2"></span>
                            </div>
                        </div>
                            <ul className="board-buttons">
                                <li>
                                    <button onClick={() => {
                                      audio.play()
                                    ToastsStore.error("Coming soon...")}
                                    }>
                                    <ToastsContainer store={ToastsStore} />

                                        <img src={One}></img><span>Custom Game</span></button>                        
                                </li>
                                <li>
                                    <Link to ='/player-detail'><button ><img src={Two}></img><span>Two Players</span></button>   </Link>                     
                                </li>
                                <li>
                                <button onClick={() => {
                                      audio.play()
                                    ToastsStore.error("Coming soon...")}
                                    }><img src={Online}></img><span>Game Online</span></button>                        
                                </li>
                                <li>
                                <button onClick={() => {
                                      audio.play()
                                    ToastsStore.error("Coming soon...")}
                                    }><img src={Training}></img><span>Training Game</span></button>                        
                                </li>
                             </ul>
                        </div>
                    </div>
                <span className="copyright">© 2020</span>
            </div>            
        </div>
    )
}

export default Home;
