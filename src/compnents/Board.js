import React,{Component} from 'react';


class Board extends Component {

  getformat=(col,row)=>{
    let items = [];
   for(let i=0;i<col;i++){
      let winnerclass='';
     // console.log('rander2 row:',row);
        //console.log('rander2 column:',i);
       // console.log('rander2 winner board',this.props.display.winnerboard);
        let winnerdis = this.props.display.winnerboard;
      
            if((winnerdis['row']===row && winnerdis['column']===i) || 
            (winnerdis['row1']===row && winnerdis['column1']===i)||
            (winnerdis['row2']===row && winnerdis['column2']===i)||
            (winnerdis['row3']===row &&  winnerdis['column3']===i)){  
              winnerclass = test;
            }
            else{
              winnerclass = divStyle;
            }
            let  playerClass = noPlayer;
            if(this.props.display.board[row][i]===1)
             playerClass = player1
             if(this.props.display.board[row][i]===2)
             playerClass = player2
            
           items.push(<td style={columnStyle} onClick={()=>this.props.handleClick(i)} key={i}>
        <div style={winnerclass}>
          { //Player {this.props.display.board[row][i]}
            <div style={playerClass}></div>
          } 
        </div>
       
        </td>)
      }
    return items
  }

  render(){ 
   console.log('render 02',this.props.display.board);
    return this.props.display.board.map((row,i)=>{
     return <tr  key={i}>{this.getformat(row.length,i)}</tr>;
    })
  }
}

const columnStyle = {
 textAlign:'center',
 border: '2px solid #4EB1BA'
};

const divStyle ={
  padding: '20px',
  width: '70px',
  background: '#1f41b5',
  textAlign:'center',
  cursor: 'pointer',
  color:'black'
}

const test= {
  padding: '20px',
  width: '70px',
  background: '#01ff70',
  textAlign:'center',
  cursor: 'pointer',
  color:'black'
}

const noPlayer ={
  background: '#fff',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  margin: 'auto',
  textAlign: 'center',
}
const player1={
  background: '#f69748',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  margin: 'auto',
  textAlign: 'center',
}

const player2={
  background: '#a139ba',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  margin: 'auto',
  textAlign: 'center',
}

export default Board;
