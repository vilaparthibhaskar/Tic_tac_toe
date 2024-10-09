import { useState } from "react";
import Tile from "./Tile";

export default function Gameboard({log, board, setlog}){

    return (
        <>
        <div className="container-fluid">
            {board.map((ar, row) => {
                return (
                <div key={row} className="row" style={{ '--bs-gutter-x': '0' }}>
                {ar.map((item, col) => {
                    return (
                    <div key={String(row) + col} className="col-4 border border-secondary">
                    <Tile val={item} row={row} col={col} log={log} setlog={setlog}/>
                    </div>
                    );
                })}
                </div>);
            })}
        </div>
        </>
    );
};