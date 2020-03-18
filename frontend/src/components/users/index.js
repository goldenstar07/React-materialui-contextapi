import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../context/user';

import UserTableHeader from './table-header';
import UserControl from './control';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  loader: {
    margin: 'auto',
    height: '300px'
  }
});
const Users = () => {
  const classes = useStyles();
  const { data: { users, loading, count, params: { page, search, category, subCategory } }, methods: { getUsers } } = useUser();

  useEffect(() => {
    getUsers({ page, search, category, subCategory});
  }, []);

  return (
    <div>
      <UserControl/>
      <Paper className={classes.root}>
        <TableContainer>
          <Table>
            <UserTableHeader/>
            {!loading ? <TableBody>
              {users.map((user, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.first_name}
                  </TableCell>
                  <TableCell>
                    {user.last_name}
                  </TableCell>
                  <TableCell>
                    {user.country}
                  </TableCell>
                  <TableCell>
                    {user.city}
                  </TableCell>
                  <TableCell>
                    {user.category && user.category.name || ""}
                  </TableCell>
                  <TableCell>
                    {user.sub_category && user.sub_category.name || ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> :
            <div className={classes.loader}>
              <CircularProgress/>
            </div> }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={10}
          page={page}
          onChangePage={() => {}}
        />
      </Paper>
    </div>
  )
}

export default Users;