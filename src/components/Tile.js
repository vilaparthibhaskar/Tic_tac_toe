import React from "react";

export default function Tile({val, row, col, log, setlog}){
    let currentPlayer = 'X';

    if(log.length > 0){
        if(log[0].val === 'X'){
            currentPlayer = 'O'
        }
    }

    let clr = {'color':'#d62828'}
    if(val === 'O'){
        clr['color'] = '#2a9d8f'
    }

    function handleClick(row, col){
        let temp = {row:row, col:col, val:currentPlayer}
        setlog((current) => {
            return [temp, ...current]
        })
    }

    let tile = <p className="m-1 mt-3 fw-bold fs-3 fst-italic" style={clr}>{val}</p>

    return (
        <div className="border" style={{height:'70px', cursor: 'pointer'}} onClick={() => handleClick(row, col)}>
            {val !== '' ? tile : undefined}
        </div>
    );
}