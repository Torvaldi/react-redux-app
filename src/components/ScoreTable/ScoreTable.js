import React from 'react';

import './scoreTable.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ScoreTable = ( {turnResult} ) => {

  let count = 0;
  return (
    <section className="scoreTurnTable">
        <Table >
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Player</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Answer</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {turnResult.map((turn) => {
            
            let rowCss = 'tableRowScore';
            
            if(turn.score > 0){
              rowCss = 'tableRowScoreRight'
            }

            
            count++;
            return(
              <TableRow key={count} className={rowCss}>
                <TableCell className="tableCellScore" align="center">rank</TableCell>
                <TableCell className="tableCellScore"  align="center">{turn.username}</TableCell>
                <TableCell className="tableCellScore"  align="center">{turn.score}</TableCell>
                <TableCell className="tableCellScore"  align="center">{turn.lastAnswer != null ? turn.lastAnswer.nameJap : ''}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default ScoreTable;
