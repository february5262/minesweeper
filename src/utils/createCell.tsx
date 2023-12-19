export function createCell(row:any,col:any){
    return{
        row,
        col,
        isBomb:false,
        isFlipped:false,
        value:0,
    }
}