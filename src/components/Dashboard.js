import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { getOrders } from '../redux/actions/ordersActions';
import BaseDashBoard from './BaseDashBoard';
import DashboardLayout from './DashboardLayout';

export default function Dashboard() {
  return (
    <Box>
      <DashboardLayout>
        <Switch>
          <Route path="/" exact>
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          </Route>

          <Route path="/dashboard">
            <BaseDashBoard />
          </Route>

          <Route path="/users">users</Route>

          <Route path="/products">products</Route>

          <Route path="/orders">orders</Route>

          <Route path="/settings">settings</Route>
        </Switch>
      </DashboardLayout>
    </Box>
  );
}
