import React from "react";

export default function Log({log, player1, player2}){

    return (
        <ul style={{ listStyleType: 'none'}}>
            {log.map((item, index) =>
            {
                let currentPlayer = player1;
                if(item['val'] === 'O'){
                    currentPlayer = player2;
                }
                return (
                <li className="mt-2" key={index} >{currentPlayer} clicked on Row {item['row']} and column {item['col']}</li>
                );
            })}
        </ul>
    );

}