import React,{Component} from 'react';
import Board from './compnents/Board';
import './App.css';


class App extends Component {
 
 state = {
    player1: 1,
    player2: 2,
    currentPlayer: null,
    board: [],
    gameOver: false,
    message: '',
    winnerboard:[]
  };
 
  // Display Board
  getBoardDisplay(){
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { row.push(0) }
      board.push(row);
    }
    
    this.setState({
      board,
      currentPlayer: this.state.player2,
      gameOver: false,
      message: 'Player 1 Playing',
      winnerboard:[]
    });
  }

  // addlistener onload in the board
  componentDidMount() {
    this.getBoardDisplay();
  }

  // Checking Player position in the board
  playerPosition=(columnId)=>{
    let {gameOver,message,board,currentPlayer}={...this.state};
    let filledColumnStatus = true;
    if(gameOver){
        return false
    }
    
    for(let reverseLoop=5;reverseLoop>=0;reverseLoop--){
       if(board[reverseLoop][columnId]===0){
          board[reverseLoop][columnId]=currentPlayer;

          currentPlayer=this.state.currentPlayer===this.state.player1?this.state.player2:this.state.player1;
          this.setState({currentPlayer})
          
          filledColumnStatus = false;
          break;
       }
    }
   let draw_status  = this.drawValidation(board)
   //console.log('draw_status',draw_status)
   if (draw_status) {
      gameOver = true;
      message = "Game Draw";
      this.setState({message})
    }
    else{
 
      if (filledColumnStatus){currentPlayer = this.togglePlayer(currentPlayer);}
      else{
        message = (currentPlayer === 1 ? "Player 2 Playing" : "Player 1 Playing");
        this.setState({message})
      }
      
    }

   // console.log('draw',draw_status);
    
    this.setState({board});
   //console.log('horizontal winer response',this.boardHorizontal(board));
    this.boardVertical(board);
    this.boardDiagonalRight(board);
    this.boardDiagonalLeft(board);
    if(this.boardHorizontal(board) || this.boardVertical(board) ||  this.boardDiagonalRight(board) ||this.boardDiagonalLeft(board)){
     // console.log('Current winner Player',this.state)
      
      gameOver  = true;
      message = (currentPlayer === 1 ? "Player 1 Wins" : "Player 2 Wins");
      this.setState({message})
      this.setState({gameOver})
    }

  };

  // function to toggle player
 togglePlayer = currentPlayer => {
  return currentPlayer === 1 ? 2 : 1;
};

  drawValidation  =(board)=>{
    for (let r = 0; r <= 5; r++) {
      for (let c = 0; c <= 6; c++) {
        if (board[r][c] === 0) return false; 
      }
    }
    return 'draw';
  }
   // checking board status horizontally
   boardHorizontal=(board)=>{
    // Check only if column is 3 or less
   
    let {winnerboard}={...this.state};
    for (let rowLoop =0; rowLoop <= 5; rowLoop++) {
      for (let columnLoop =0; columnLoop <= 3; columnLoop++) {
        if (board[rowLoop][columnLoop]) {
         if (board[rowLoop][columnLoop] === board[rowLoop][columnLoop + 1] && 
          board[rowLoop][columnLoop] === board[rowLoop][columnLoop + 2] &&
          board[rowLoop][columnLoop] === board[rowLoop][columnLoop + 3]) {
              //console.log('Horizontal win')
              winnerboard['row']=rowLoop;
              winnerboard['column']=columnLoop;
              winnerboard['row1']=rowLoop;
              winnerboard['column1']=columnLoop + 1;
              winnerboard['row2']=rowLoop;
              winnerboard['column2']=columnLoop + 2;
              winnerboard['row3']=rowLoop;
              winnerboard['column3']=columnLoop + 3; 
              this.setState({winnerboard});
              return board[rowLoop][columnLoop];
           }
        }
      }
     
    }
  }

  // checking board status vertically
  boardVertical=(board)=>{
   // console.log(board);
     // Check only if column is 3 or less
    
    let {winnerboard}={...this.state};
     for (let rowLoop=0; rowLoop <=2; rowLoop++) {
      for (let columnLoop =0; columnLoop <= 6; columnLoop++) {
      
       if (board[rowLoop][columnLoop]!==0) {
        if(
            board[rowLoop][columnLoop] === board[rowLoop+1][columnLoop] && 
            board[rowLoop][columnLoop] === board[rowLoop+2][columnLoop] &&
            board[rowLoop][columnLoop] === board[rowLoop+3][columnLoop]
          ) {
              winnerboard['row']=rowLoop;
              winnerboard['column']=columnLoop;
              winnerboard['row1']=rowLoop+1;
              winnerboard['column1']=columnLoop;
              winnerboard['row2']=rowLoop+2;
              winnerboard['column2']=columnLoop;
              winnerboard['row3']=rowLoop+3;
              winnerboard['column3']=columnLoop; 
              this.setState({winnerboard});
            //console.log('vertical win')
            return board[rowLoop][columnLoop];
           }
        }
      }
    }
  }

  // checking board status diagonally Right
  boardDiagonalRight=(board)=>{
   let {winnerboard}={...this.state};
    for (let rowLoop = 3; rowLoop <= 5; rowLoop++) {
      for (let columnLoop = 0; columnLoop < 4; columnLoop++) {
        if (board[rowLoop][columnLoop]) {
          if (
            board[rowLoop][columnLoop] === board[rowLoop - 1][columnLoop + 1] &&
            board[rowLoop][columnLoop] === board[rowLoop - 2][columnLoop + 2] &&
            board[rowLoop][columnLoop] === board[rowLoop - 3][columnLoop + 3]
          ){

            winnerboard['row']=rowLoop;
            winnerboard['column']=columnLoop;
            winnerboard['row1']=rowLoop - 1;
            winnerboard['column1']=columnLoop+1;
            winnerboard['row2']=rowLoop-2;
            winnerboard['column2']=columnLoop+2;
            winnerboard['row3']=rowLoop-3;
            winnerboard['column3']=columnLoop+3; 
            this.setState({winnerboard});

           // console.log('diagonal right win')
            return board[rowLoop][columnLoop];
          }
          
        }
      }
    }
  }

  // checking board status diagonally Left
  boardDiagonalLeft=(board)=>{
   let {winnerboard}={...this.state};
    for (let rowLoop = 3; rowLoop <= 5; rowLoop++) {
      for (let columnLoop = 3; columnLoop <= 6; columnLoop++) {
        if (board[rowLoop][columnLoop]) {
          if (
            board[rowLoop][columnLoop] === board[rowLoop - 1][columnLoop - 1] &&
            board[rowLoop][columnLoop] === board[rowLoop - 2][columnLoop - 2] &&
            board[rowLoop][columnLoop] === board[rowLoop - 3][columnLoop - 3]
          ){

            winnerboard['row']=rowLoop;
            winnerboard['column']=columnLoop;
            winnerboard['row1']=rowLoop - 1;
            winnerboard['column1']=columnLoop-1;
            winnerboard['row2']=rowLoop-2;
            winnerboard['column2']=columnLoop-2;
            winnerboard['row3']=rowLoop-3;
            winnerboard['column3']=columnLoop-3; 
            this.setState({winnerboard});

          console.log('diagonal left win')
            return board[rowLoop][columnLoop];
          }
         
        }
      }
    }
  }

  startagain=()=>{
    this.getBoardDisplay();
  }

  reset={
    color:'#fff',
    cursor:'pointer',
    padding:'2%',
    background:'#1f41b5'
  }

  maincontainer = {
    display:'flex',
    background: '#fff'
   };
    player1={
    background: '#f69748',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: 'auto',
    textAlign: 'center',
  }
  player2={
    background: '#a139ba',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: 'auto',
    textAlign: 'center',
  }
  render(){
   // console.log(this.state);
    return (
      <div className="content">
      <div style={this.maincontainer}>
       <div style={{textAlign:'center',float:'left',width:'30%',background:'#b2cecf'}}>
       <h3>Chingu Solo Project - Connect 4 </h3>
       <h3>Vandna Kapoor</h3>
        <span onClick={this.startagain} style={this.reset}>Restart Game</span>
        
        <div >
        <div>
          <h3 style={{color:'#ef5656'}} >{this.state.message}</h3>
          </div>
          
          <div style={{display: 'flex'}}>
            <div style={{float: 'left',marginLeft: '18.5%'}}><h3> Player 1</h3></div>
              <div style={this.player2}></div>
          </div>
              <div style={{display: 'flex'}} >
                <div style={{float: 'left',marginLeft: '18.5%'}}><h3 >Player 2</h3></div>
                <div style={this.player1}></div>
                </div>
                  </div>
        
        </div>
        <div style={{textAlign:'center',float:'left',width:'30%'}}>
        <table >
        <tbody>
          <Board display={this.state} handleClick={this.playerPosition}/>
        </tbody>
        </table>
       </div>
        
    </div>
    </div>
    );
  }
 
}



 
export default App;
