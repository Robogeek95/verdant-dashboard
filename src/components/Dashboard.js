import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import BaseDashBoard from './BaseDashBoard';
import DashboardLayout from './DashboardLayout';

export default function Dashboard() {
  return (
    <Box>
      <DashboardLayout>
        <Switch>
          <Route path="/">
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
