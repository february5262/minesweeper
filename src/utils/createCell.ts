export function createCell(row:number,col:number){
    return{
        row,
        col,
        isBomb:false,
        isFlipped:false,
        value:0,
    }
}