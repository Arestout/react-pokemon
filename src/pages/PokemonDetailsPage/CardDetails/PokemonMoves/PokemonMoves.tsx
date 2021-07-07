import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { motion } from 'framer-motion';

import { PokemonMovesSource } from 'reduxApp/pokemons';
import { IPokemonMove, usePokemonMoves } from './hooks/usePokemonMoves';

import './PokemonMoves.styles.scss';

interface Data {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  power_point: number;
}

function createData(move: IPokemonMove): Data {
  const power = move.power ?? '-';
  const accuracy = move.accuracy ?? '-';
  const power_point = move.pp ?? '-';
  const {
    name,
    type: { name: type },
  } = move;
  return { name, type, power, accuracy, power_point };
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Move',
  },
  { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'power', numeric: true, disablePadding: false, label: 'Power' },
  { id: 'accuracy', numeric: true, disablePadding: false, label: 'Accuracy' },
  {
    id: 'power_point',
    numeric: true,
    disablePadding: false,
    label: 'Power Point',
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    tableHead: {
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: '14px',
      fontFamily: 'Lato, Arial, sans-serif',
      width: '150px',
    },
    tableCell: {
      fontSize: '14px',
      fontFamily: 'Lato, Arial, sans-serif',
      width: '150px',
    },
    typeCell: {
      borderRadius: '10px',
      padding: '5px 12px',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

interface IPokemonMoves {
  pokemonMovesSource: PokemonMovesSource[];
}

const rowVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
};

export const PokemonMoves = ({
  pokemonMovesSource,
}: IPokemonMoves): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const dense = false;
  const rowsPerPage = 5;

  const { pokemonMoves, isLoading } = usePokemonMoves(pokemonMovesSource, page);
  const rows = pokemonMoves[page]?.map(createData) ?? [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);

  const emptyRowsCells = Array.from({ length: rowsPerPage });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} rowCount={rows.length} />
            <TableBody
              component={motion.tbody}
              initial="hidden"
              animate="enter"
            >
              {isLoading &&
                emptyRowsCells.map((row, index) => (
                  <TableRow key={index}>
                    {emptyRowsCells.map((row, index) => (
                      <TableCell
                        key={index}
                        style={{ width: '150px' }}
                        align="right"
                      >
                        <Skeleton height={20} animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {rows.map((row) => {
                return (
                  <TableRow
                    tabIndex={-1}
                    key={row.name}
                    component={motion.tr}
                    variants={rowVariants}
                  >
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      <span
                        className={`background--${row.type} ${classes.typeCell}`}
                      >
                        {row.type}
                      </span>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.power}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.accuracy}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {row.power_point}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!isLoading && emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={pokemonMovesSource.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};
