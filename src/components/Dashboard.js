import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Route, Switch } from 'react-router';
import DashboardLayout from './DashboardLayout';

export default function Dashboard() {
  return (
    <Box>
      <DashboardLayout>
        <Switch>
          <Route path="/dashboard">dashboard</Route>

          <Route path="/users">users</Route>

          <Route path="/products">products</Route>

          <Route path="/orders">orders</Route>

          <Route path="/settings">settings</Route>
        </Switch>
      </DashboardLayout>
    </Box>
  );
}
