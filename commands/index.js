import React, {useState} from 'react';
import {Box, Color, Static, Text, useInput} from 'ink';
import Gradient from 'ink-gradient';
import chalk from 'chalk';

const odd = x => x % 2 == 1
const set = (x, y, newPiece) => (line,i) => line.map((piece, j) => j==x && i==y ? newPiece : piece )

const EMPTY_SQUARE = {p:' ', c:'e'}

const Sq = ({p,cursor,bgIsWhite}) => 
	<Color 
		hex={p.c=='b' ? "#000000" : '#FFFFFF'} 
		bgHex={cursor ? '#C2BD79' : bgIsWhite ? "#555555" : "#999999"}
	>
		<Box width={3} justifyContent='center' alignItems='center'>
			{p.c=='b' ? chalk.bold(' '+p.p+' ') : ' '+p.p+' '}
		</Box>
	</Color>

const initBoard =  
	[
		['R','N','B','Q','K','B','N','R'].map(x=>({p:x, c:'w'})),
		['P','P','P','P','P','P','P','P'].map(x=>({p:x, c:'w'})),
		[' ',' ',' ',' ',' ',' ',' ',' '].map(x=>({p:x, c:'e'})),
		[' ',' ',' ',' ',' ',' ',' ',' '].map(x=>({p:x, c:'e'})),
		[' ',' ',' ',' ',' ',' ',' ',' '].map(x=>({p:x, c:'e'})),
		[' ',' ',' ',' ',' ',' ',' ',' '].map(x=>({p:x, c:'e'})),
		['P','P','P','P','P','P','P','P'].map(x=>({p:x, c:'b'})),
		['R','N','B','Q','K','B','N','R'].map(x=>({p:x, c:'b'})),
	]

const Chess = () => {
	const [curX,setCurX] = useState(3)
	const [curY,setCurY] = useState(3)
	const [board,setBoard] = useState(initBoard)
	const [moving,setMoving] = useState(false)
	const [mover,setMover] = useState({})
	const [lastBoard,setLastBoard] = useState([[]])
	useInput((_,k)=>{
		if (k.return  && !moving && board[curY][curX].c=='e') return // cant pick up empty square
		k.rightArrow && curX<7  && setCurX(curX+1)
		k.leftArrow  && curX>0  && setCurX(curX-1)
		k.downArrow  && curY<7  && setCurY(curY+1)
		k.upArrow    && curY>0  && setCurY(curY-1)
		k.return     && !moving && setMover({x:curX, y:curY, piece:board[curY][curX]})
		k.return     && !moving && setLastBoard(board)
		k.return     && moving  && setBoard(board
			.map(set(mover.x, mover.y, EMPTY_SQUARE))
			.map(set(curX, curY, mover.piece))
		)
		k.return     && setMoving(!moving)
		k.escape     && setBoard(lastBoard)
	})
	return(
		<>
		{/* <Static> */}
			<Text> </Text><Text> </Text><Text> </Text>
			<Gradient name="mind"><Text>return picks up and drops pieces</Text></Gradient>
			<Gradient name="mind"><Text>escape will undo the last move</Text></Gradient>
			<Text> </Text><Text> </Text>
		{/* </Static> */}
		{
			board
			.map(moving ? set(mover.x, mover.y, EMPTY_SQUARE) : x=>x)
			.map(moving ? set(curX, curY, mover.piece) : x=>x)
			.map((line,i)=> line.map((piece,j)=>
				<Sq 
					bgIsWhite={odd(i) == odd(j)}
					cursor={i==curY && j==curX} 
					key={j} 
					p={piece}
				/>
			))
			.map((line,i)=><Box key={i}>{line}</Box>)
		}
		</>
)}

export default Chess;