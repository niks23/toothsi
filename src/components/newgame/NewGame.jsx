import React, { Component } from 'react'
import { connect } from 'react-redux';
import Row from './Row';
import Avatar1  from '../../assets/images/avatar01.png';
import Avatar2  from '../../assets/images/avatar02.png';
import Aud from  '../../assets/click.mp3';
import AudC from  '../../assets/connect.mp3';
import Aos from 'aos';
import "aos/dist/aos.css";
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
let audio = new Audio(Aud);
  let audioCon = new Audio(AudC);
class NewGame extends Component {
    
  state = {
      player1: {
          id: 1,
          name: this.props.userData.playerOneDetail.name,
          won: 0
          // this.props.userData.playerOneDetail.name
      },
      player2: {
          id: 2,
          name: this.props.userData.playerTwoDetail.name,
          won: 0
          // this.props.userData.playerTwoDetail.name
      },
      //  this.props.userData.playerOneDetail.name,
      // this.props.userData.playerTwoDetail.name,
      currentPlayer: null,
      whoStarts: this.props.userData.gameRules.whoStarts,
      //  this.props.userData.gameRules.whoStarts, 
      board: [],
      gameCount: this.props.userData.gameRules.gameCount, 
      // this.props.userData.gameRules.gameCount,
      looser: '',
      lastTurn: '',
      gameOver: false,
      newTournament: false,
      tournamentEnd: false,
      message: '',
      message2: '',
      count: 1,
      lastMove: {
        row: '',
        column: ''
      }
  };

  componentDidMount() {            
    Aos.init({duration: 2000});
  }
     // Starts new game
  initBoard = () => {
    // Create a blank 6x7 matrix
  
    let board = [];
    for (let r = 0; r < 8; r++) {
      let row = [];
      for (let c = 0; c < 8; c++) { row.push(null) }
      board.push(row);

      console.log(this.props.userData.gameRules.gameCount);
    }
    // console.log("Nikh", );

    let playerTurn = ''

      // if(this.state.player1.won == 0 && this.state.player2.won == 0) {
      if(this.state.whoStarts == 'player-two') {
         playerTurn = this.state.player2.id 
      } else if(this.state.whoStarts == 'looser') {
        if(this.state.looser == "player-two") {
          playerTurn = this.state.player2.id
        } else {
          playerTurn = this.state.player1.id
        }
      } else if(this.state.whoStarts == 'winner') {
      
        if(this.state.looser == "player-two") {      
          playerTurn = this.state.player1.id;
        } else {
          playerTurn = this.state.player2.id;          
        }
      } else if(this.state.whoStarts="alternate"){
        if(this.state.lastTurn == 'player-two') {
          playerTurn = this.state.player1.id;
        } else {
          playerTurn = this.state.player2.id;
        }

      }else {
        playerTurn = this.state.player1.id
      } 
      // else if() {
        
      // }
    // console.log(playerTurn);

    this.setState({
      board,
      currentPlayer: playerTurn,
      gameOver: false,
      message: ''
    });

    console.log(this.state);
  }
  
  togglePlayer = () => {
    return (this.state.currentPlayer === this.state.player1.id) ? this.state.player2.id : this.state.player1.id;
  }
  
  play = (c) => {
  console.log("hell",c);
  
  
  audioCon.play();
    if (!this.state.gameOver) {
      // Place piece on board
      // return;
      let board = this.state.board;

      for (let r = 7; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c]= this.state.currentPlayer;
          
         let lastMove = {...this.state.lastMove}
         lastMove.row = r;
         lastMove.column = c;
         audioCon.play();
          this.setState({lastMove})
          // this.setState({...this.state.lastMove, row: r})                  
          break;
        }
      }
      // return;

    //  return;
      // Check status of board
      let result = this.checkAll(board);  
        // if( flag !== this.state.gameCount) {
            if (result === this.state.player1.id) {

                let playOneWon = this.state.player1.won++;

                console.log(this.state.gameCount);
                console.log("Won", this.state.player1.won);
                console.log(this.state.gameCount == this.state.player1.won);

                if(this.state.player1.won == this.state.gameCount) {
                  let player1 = {...this.state.player1}
                  let player2  = {...this.state.player2}

                  player1.won = 0;
                  player2.won = 0;

                  this.setState({ board, tournamentEnd: true, gameOver: true, player1, player2, newTournament: true, won: 0, message:   this.state.player1.name  + ', you Have won the tournament!'  }); 
                  audio.play();

                    // if(this.state.gameR)
                } else {                
                  this.setState({ board, gameOver: true, looser: "player-two", lastTurn: "player-one", won: playOneWon, message:  this.state.player1.name  + ', you won Game!' });                				  
                    // console.log(this.state.newTournament);
                    let newCount = this.state.count++;
                    this.setState({count: newCount})
                }               
                console.log(this.state.player1.won);
            } else if (result === this.state.player2.id) {
                let playTwoWon = this.state.player2.won++;
                
                let player1 = {...this.state.player1}
                let player2  = {...this.state.player2}

                player1.won = 0;
                player2.won = 0;

                if(this.state.player2.won == this.state.gameCount) {
                  this.setState({ board, tournamentEnd: true, gameOver: true, player1, player2, newTournament: true, won: 0, message: this.state.player2.name  + ', you Have won the tournament!'  });                   
                  audio.play();

                } else {
                  this.setState({ board, gameOver: true , lastTurn: "player-two", looser: "player-one", won: playTwoWon, message:   this.state.player2.name  + ', you won Game!'  });
                    let newCount = this.state.count++;
                    this.setState({count: newCount})
                  }

                console.log(this.state.player2.won);
            } else if (result === 'draw') {
                this.setState({ board, gameOver: true, message: 'Draw game.' });
                // flag++;
                // console.log(flag);
            } else {

              // console.log(this.state.lastMove);
                this.setState({ board, currentPlayer: this.togglePlayer() });
                
                // flag++;
            }
        // } else {
        //     this.setState({ board, gameOver: true, message: 'Congratulations!' + this.state.player1.name  + ' you won Tournament!' });
        //     this.setState({newTournament: true});
        // }
   
    }
  }
  
  checkVertical = (board) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            return board[r][c];    
          }
        }
      }
    }
  }
  
  checkHorizontal = (board) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalRight = (board) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft = (board) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 3; c < 8; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }
  
  checkDraw = (board) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  checkAll = (board) => {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }
  
  componentWillMount = () => {
    this.initBoard();
  }

  undoStep = () => {
    let lastMove = {...this.state.lastMove}
    let board = this.state.board;
    board[lastMove.row][lastMove.column] = null;
    // console.log(board);
    // return;
    this.setState({board: board});
  
  }

  endTournament = () => {
    // let board = this.state.board;
  audio.pause();
    let playerOne = this.state.player1; 
    let playerTwo = this.state.player2;
    playerOne['won'] = 0;
    playerTwo['won'] = 0;

  
    this.setState({player1: playerOne})
    this.setState({player2: playerTwo})
    this.setState({count: 1})
    this.setState({tournamentEnd: false})
    this.initBoard();
    console.log(this.state.player1, this.state.player2)
    // this.setState({ board, gamever: true, newTournament: true, won: 0, message: 'Tournament has been End'  });
  }
  render() {   
    return (
      <>
         <div className="back">    
          <Link to="/player-detail"> <FaArrowLeft /></Link>
              <h2 className="head">Two Players Game</h2>
          </div>
        <div className="new-game-container">
        <div data-aos="zoom-in" className="new-game">
               
          	<ul className="table">
				{/* <thead>
				</thead>
				<tbody> */}

				{this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}

				{/* </tbody> */}
          	</ul>
          
          	{/* <div className="message">
				  {this.state.message}
				  { this.state.message ? 
					//   this.state.message
						<div className="button" onClick={() => {this.initBoard()}}>New Game</div>        
					: '' }

			</div> */}
        </div>
		<div className="game-detail">
			<h2>{this.state.gameCount} Games Tournament</h2>
      <div className="message">
    {this.state.message ?  <><span className="congo">Congratulations!</span> <p className="congo-msg">{this.state.message}</p> </>: <span class="playing">Playing Game {this.state.count}</span>}
				  {/* { this.state.message ? 
					//   this.state.message
						<div className="button" onClick={() => {this.initBoard()}}>New Game</div>         */}
					{/* : '' }         */}
			</div>
			
			<div className="new-player-one">
        <span className={ this.state.currentPlayer == 1 ? 'player-one-image active-player': 'player-one-image'}
        	// style={{ border: this.state.currentPlayer == 1 ? '.8vw solid #FFA200' : '.8vw solid #DCF6E4'}}
>
        <span 
	>
    <img src={Avatar1}></img>
    </span></span>
				<div className="player-game">
					<span>Player 01</span>
					<span>{this.state.player1.name}</span>					
				</div>
				<div className="score">
					<span>Score</span>
					<span>{this.state.player1.won}</span>					
				</div>
			</div>
			<div className="new-player-two">		
        <span  className={ this.state.currentPlayer == 2 ? 'player-two-image active-player': 'player-two-image'}

      	// style={{ border: this.state.currentPlayer == 2 ? '.8vw solid #FFA200 ' : '.8vw solid #F6EFD5'}}
>		
			  	<span
			  	>
          <img src={Avatar2}></img>
          </span>
        </span>
				<div className="player-game">
					<span>Player 02</span>
					<span>{this.state.player2.name}</span>					
				</div>
				<div className="score">
					<span>Score</span>
					<span>{this.state.player2.won}</span>					
				</div>
			</div>
			<div className="new-game-cta">
      { this.state.message && !this.state.tournamentEnd ? 
					//   this.state.message
						<button onClick={() => {this.initBoard()}}>New Game</button>        
					: 
          this.state.tournamentEnd ? 
          <button onClick={this.endTournament}>Play Again</button> : <button onClick={this.undoStep}>Undo Step</button>
          } 
        {/* {
          
          <button onClick={this.undoStep}>Undo Step</button> 
        } */}
				{/* <button onClick={this.undoStep}>Undo Step</button> */}
				<button onClick={this.endTournament}>End Tournament</button>

				{/* {
              !this.state.newTournament ?
                <div className="button" onClick={() => {this.initBoard()}}>New Game</div>        
              :
              <div className="button" onClick={() => {this.initBoard()}}>New Tournament</div>        
            }  */}
			</div>
		</div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(NewGame);