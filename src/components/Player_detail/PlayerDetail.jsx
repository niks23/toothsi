import React, { Component, useState } from 'react'
import PlayerOneModal from 'react-modal';
import PlayerTwoModal from 'react-modal';
import GameCountModal from 'react-modal';
import PlayerTurnModal from 'react-modal';
import { Link, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NewGame from '../newgame/NewGame';
import { connect } from 'react-redux';
import './PlayerDetail.scss';
import { newGame } from '../../store/actions/new-game';
import ImageUploader from 'react-images-upload';
// import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import { browserHistory } from 'react-router'
import Avatar1  from '../../assets/images/avatar01.png';
import Avatar2  from '../../assets/images/avatar02.png';
import Run  from '../../assets/images/run.png';
import Winner  from '../../assets/images/winner.png';

class  PlayerDetail extends Component {
    // render() {
        
        state = {
            modalIsOpen: false,
            modalTwoIsOpen: false,
            gameCount: false,
            turn: false,
            playerName: '',
            ruleOne: 2,
            ruleTwo: 'Alternate',
            pictures: [],
            setNewGame: false,
            playerOneDetail: {
                name: '',
                avatar: ''
            },
            playerTwoDetail: {
                name: '',
                avatar: ''
            },
            gameRules: {
                gameCount: '',
                whoStarts: ''
            }            
        }

        toggleModal = (player) => {
            
            if(player == 'player-one') {
                this.setState({modalIsOpen: !this.state.modalIsOpen})

            } else if(player == 'player-two') {
                this.setState({modalTwoIsOpen: !this.state.modalTwoIsOpen})

            } else if (player == 'game-count') {
                this.setState({gameCount: !this.state.gameCount});

            } else {
                this.setState({turn: !this.state.turn})
            }  
        }

        onPlayerRuleSubmit = (e, ruleName) => {
            e.preventDefault();

            if(ruleName == 'game-count') {
                
                // this.setState({...this.state.gameRules, gameCount: this.state.ruleOne})
                this.setState(state => (state.gameRules.gameCount = this.state.ruleOne, state))
                // console.log(this.state.ruleOne);
                this.setState({gameCount: !this.state.gameCount});
            } else {
                // this.setState({...this.state.gameRules, whoStarts: this.state.ruleTwo})
                this.setState(state => (state.gameRules.whoStarts = this.state.ruleTwo, state))
                this.setState({turn: !this.state.turn});
            }                                                    
        }

        onChangeHandler = (e) => {
            this.setState({playerName: e.target.value})                    
        }

         onPlayerNameSubmit = (e, player) => {
            e.preventDefault();                        
        
            if(player == 'player-one') {            
                
                console.log(this.state.playerName);     
                this.setState(state => (state.playerOneDetail.name = this.state.playerName, state))
                // this.setState({...this.state.playerOneDetail, name: this.state.playerName})
                // console.log(this.state.playerOneDetail);
                this.setState({modalIsOpen: !this.state.modalIsOpen})
            } else {
                this.setState(state => (state.playerTwoDetail.name = this.state.playerName, state))
                // this.setState({...this.state.playerOneDetail, name: this.state.playerName})
                this.setState({modalTwoIsOpen: !this.state.modalTwoIsOpen})
            }                                        
        }

        onTurnChanged = (e, player) => {
            console.log(player);
            if(player == 'game-count') {                
                this.setState({ruleOne: e.target.value})
            } else {
                this.setState({ruleTwo: e.target.value})
            }                        
                    
        }

        validate = () => {
            let validation = true;
            if(this.state.playerOneDetail.name == '') {
                alert("Please enter the name for Player One");
                validation = false;
            } else if (this.state.playerTwoDetail.name == '') {
                alert("please enter the name for Player Two");
                validation = false;
            } else if (this.state.gameRules.gameCount == '') {
                alert('Please select Number of games');
                validation = false;
            } else if(this.state.gameRules.whoStarts == '') {
                alert('Please select who Starts');
                validation = false;
            }

            if(validation == true) {   
                this.setState({setNewGame: true});
                this.props.newGame(this.state);
                this.props.history.push("/new-game");
            }
        }
        
  onDrop= (pictureFiles, pictureDataURLs) => {
        console.log(pictureFiles, pictureDataURLs);
    this.setState({
        pictures: this.state.pictures.concat(pictureFiles)
        });
    }
        render () {
            return (            
                <div className="player-detail-container">            
                   <div className="wrapper">
                        <ul className="player-detail"> 
                            <li>
                                <span className="avatar"><img src={Avatar1}></img></span>                                
                                <div className="player_detail-input" onClick={() => this.toggleModal('player-one')}>
                                    <span>Player 01</span>
                                    <span >{this.state.playerOneDetail.name}</span>
                                </div>
                            </li>
                            <li>
                            <span className="avatar"><img src={Avatar2}></img></span>                                
                                <div className="player_detail-input" onClick={() => this.toggleModal('player-two')}>
                                    <span>Player 02</span>
                                    <span>{this.state.playerTwoDetail.name}</span>
                                </div>
                            </li>
                            <li>
                            <span className="avatar"><img src={Run}></img></span>                                
                            
                                <div className="player_detail-input" onClick={() => this.toggleModal('game-count')}>
                                    <span>Number of game</span>
                                    <span>{this.state.gameRules.gameCount}</span>
                                </div>
                            </li>
                            <li className="player_detail-input" onClick={() =>this.toggleModal('player-turn')}>
                                
                            <span className="avatar"><img src={Winner}></img></span>                                                                  
                                
                                
                                <div className="player_detail-input">
                                    <span>who starts</span>
                                    <span>{this.state.gameRules.whoStarts}</span>
                                </div>
                            </li>
                        </ul>
                        <a onClick={this.validate}>Start Game</a>
                        {/* <Link to="/new-game" onClick={
                            () => this.props.newGame(this.state)}>New Game</Link> */}

                    </div>
                    <PlayerOneModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={() => this.toggleModal('player-one')}
                    >
                        <form onSubmit={(e) => this.onPlayerNameSubmit(e, 'player-one')}>
                            <h2>Enter Name</h2>
                            <div className="uname">
                                <input type="text" name="player-one" onChange={(e) => this.onChangeHandler(e)}/>
                                <input type="submit" value="Submit" />                     
                            </div>
                        </form>
                    </PlayerOneModal>
                    <PlayerTwoModal
                        isOpen={this.state.modalTwoIsOpen}
                        onRequestClose={() => this.toggleModal('player-two')}
                    >

                        <form onSubmit={(e) => this.onPlayerNameSubmit(e, 'player-two')}>                            
                            <h2>Enter Name</h2>
                            <div className="uname">
                                <input type="text" name="player-one" onChange={(e) => this.onChangeHandler(e)}/>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                        
                    </PlayerTwoModal>
    
                    <GameCountModal
                    isOpen={this.state.gameCount}
                    onRequestClose={() => this.toggleModal("game-count")}

                >
                    <form onSubmit={(e) => this.onPlayerRuleSubmit(e, 'game-count')}>
                        <h2>
                            Number of Games
                        </h2>
                        <div className="game-count-container" onChange={(e) => this.onTurnChanged(e, 'game-count')}>
                            <div className="radio" >
                            <label>
                                <input type="radio" name="games" value="2" defaultChecked />
                                <span>2 games</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="games" value="3" />
                                <span>3 games</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="games" value="5" />
                                <span>5 Games </span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="games" value="10" />
                                <span>10 Games</span>
                            </label>
                            </div>                                                    
                        </div>
                        <div className="radio-cta">
                            <button>Cancel</button>
                            <button>Submit</button>
                        </div>
                    </form>
                </GameCountModal>
                <PlayerTurnModal
                    isOpen={this.state.turn}
                    onRequestClose={() => this.toggleModal('turn')}
                >
                     <form onSubmit={(e) => this.onPlayerRuleSubmit(e, 'turn')}>
                         <h2> Who Starts </h2>
                        <div className="game-count-container" onChange={(e) => this.onTurnChanged(e, 'turn')}>
                            <div className="radio" >
                            <label>
                                <input type="radio" name="turn" value="alternate" defaultChecked />
                                <span>Alternate Turn</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="turn" value="looser" />
                                <span>Looser First</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="turn" value="winner" />
                               <span>Winner First</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="turn" value="player-one" />
<span>Always Player 01  </span>                         </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="turn" value="player-two" />
<span>Always Player 02 </span>                      </label>
                            </div>
                        </div>
                        <div className="radio-cta">
                            <button>Cancel</button>
                            <button>Submit</button>
                        </div>
                    </form>
                </PlayerTurnModal>
          
    
                   
                </div>
            )
        }

        // const onPlayerNameSubmit = (e, player) => {
        //     e.preventDefault();
        //     console.log(playerName);
        //     // return;
        //     player == 'player-one' ?
            
        //         setPlayerOneDetail({...playerOneDetail, name: playerName})
        //     :
        //         setPlayerTwoDetail({...playerTwoDetail, name: playerName})
        //         setIsOpen(false);
        //         setTwoIsOpen(false);
        // }

        // const onPlayerRuleSubmit = (e, ruleName) => {
        //     e.preventDefault();

        //     ruleName == 'game-count' ?
        //         setGameRules({...gameRules, gameCount: ruleOne})
        //     : 
        //     setGameRules({...gameRules, whoStarts: ruleTwo})

        //     setIsOpen(false);
        //     setTwoIsOpen(false);
        //     setGameCount(false);
        //     setTurn(false);
        // }

        // const openModal = (player) => {
        //     // console.log(player);

        //     if(player == 'player-one') {
        //         setIsOpen(true) 
        //     } else if(player == 'player-two') {
        //         setTwoIsOpen(true);
        //     } else if (player == 'game-count') {
        //         setGameCount(true);
        //     } else {
        //         setTurn(true);
        //     }            
        // }               
       
        // const closeModal = () => {
        //   setIsOpen(false);
        //   setTwoIsOpen(false);
        //   setGameCount(false);
        //   setTurn(false);
        // }

        // const onChangeHandler = (e) => {
        //     setPlayerName(e.target.value);
        // }

        // const onGameCountChanged = (e) => {
        //     setRuleOne(e.target.value);
        // }

        // const onTurnChanged = (e) => {
        //     setRuleTwo(e.target.value);
        // }

}

const mapDispatchToProps = dispatch => {
    return {        
     // console.l
        newGame: (userData) => {
            dispatch(newGame(userData)); 
          
            // browserHistory.push('/new-game');


        }
    }
}

export default connect(null, mapDispatchToProps)(PlayerDetail);