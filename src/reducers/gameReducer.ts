import { createBoard, getNeighbors } from "../utils/createBoard";

export function gameReducer(state: any,action:any){
    const {type, row, col} = action;
    const {level} = action;
    const {time} = action;
    switch (type) {
        case "HANDLE_CELL":{
            if(state.board[row][col].isBomb){
                return{
                    ...state,
                    board:flipAll(state.board),
                    isGameOver:true,
                }
            }else if(state.board[row][col].value === 0){
                return{
                    ...state,
                    board:expand(row,col,state.board),
                }
            }else{
                return{
                    ...state,
                    board:flipCell(row,col,state.board),
                }
            }
        }
        case "SET_LEVEL":{
            console.log(JSON.stringify(state.board.length))
            return{
                ...state,
                board:setBoard(level)
            }
        }
        case "TIME_OUT":{
            if(time === 0){
                return{
                    ...state,
                    board:flipAll(state.board),
                    isGameOver:true,
                }
            }
        }
        default:{
            console.log("error");
        }
    }
}

function setBoard(level:{width:number,height:number,bombs:number}){
    return createBoard(level.width,level.height,level.bombs);
}
function flipCell(row:number,col:number,board: string | any[]){
    const newBoard = board.slice();
    const cell = newBoard[row][col];
    const newCell = {
        ...cell,
        isFlipped:true,
    }
    newBoard[row][col]=newCell;
    return newBoard;
}

function expand(row:number,col:number,board: string | any[]){
    const newBoard:any = board.slice();
    const stack = [[row,col]];

    while(stack.length>0){
        const [row,col] = stack.pop();
        const neighbors = getNeighbors(row,col,newBoard);

        for(const neighbor of neighbors){
            const [row,col] = neighbor;
            if(newBoard[row][col].isFlipped) continue;
            if(!newBoard[row][col].isBomb) {
                newBoard[row][col].isFlipped =true;
                if(newBoard[row][col].value>0){
                    continue;
                }
                stack.push(neighbor);
            };
        }
    }
    return newBoard;
}

function flipAll(board: string | any[]){
    const newBoard =board.slice();
    for (let row = 0; row < newBoard.length; row++) {
        for (let col = 0; col < newBoard[row].length; col++) {
            const cell = newBoard[row][col];
            const newCell={
                ...cell,
                isFlipped:true
            }
            newBoard[row][col]=newCell;
        }
    }
    return newBoard;
}
