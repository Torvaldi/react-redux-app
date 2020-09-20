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
        <Table className="tableScore">
          <TableHead className="tableScoreHeader">
            <TableRow className="tableScoreHeaderContainer">
              <TableCell className="tableScoreHead col_1" align="center">Rank</TableCell>
              <TableCell className="tableScoreHead col_2" align="center">Player</TableCell>
              <TableCell className="tableScoreHead col_3" align="center">Score</TableCell>
              <TableCell className="tableScoreHead col_4" align="center">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableScoreBody">
          {turnResult.map((turn) => {
            
            let rowCss = 'tableRowScore';
            
            if(turn.score > 0){
              rowCss = 'tableRowScoreRight'
            }
            
            count++;
            return(
              <TableRow key={count} className={rowCss}>
                <TableCell className="tableCellScore col_1" align="center">{turn.rank != null ? turn.rank : '-'}</TableCell>
                <TableCell className="tableCellScore tableCellScoreCenter col_2"  align="center">{turn.username}</TableCell>
                <TableCell className="tableCellScore tableCellScoreCenter col_3"  align="center">{turn.score}</TableCell>
                <TableCell className="tableCellScore col_4"  align="center">{turn.lastAnswer != null ? turn.lastAnswer.nameJap : '-'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>        
      </Table>
    </section>
  );
}

export default ScoreTable;
