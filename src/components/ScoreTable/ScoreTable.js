import React from 'react';

import './scoreTable.css';
import propTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ScoreTable = ( {scores} ) => {

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
          {scores.map((score) => {

            let rowCss = 'tableRowScore';
            if(score.turnScore > 0){
              rowCss = 'tableRowScoreRight'
            }

            return(
              <TableRow className={rowCss}>
                <TableCell className="tableCellScore" align="center">{score.rank}</TableCell>
                <TableCell className="tableCellScore"  align="center">{score.username}</TableCell>
                <TableCell className="tableCellScore"  align="center">{score.turnScore}</TableCell>
                <TableCell className="tableCellScore"  align="center">{score.anime ? score.anime.nameJap : '-'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default ScoreTable;
