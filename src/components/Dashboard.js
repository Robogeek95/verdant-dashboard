import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import BaseDashBoard from './BaseDashBoard';
import DashboardLayout from './DashboardLayout';
import OrdersDashboard from './OrdersDashboard';
import UsersDashboard from './UsersDashboard';

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

          <Route path="/users">
            <UsersDashboard />
          </Route>

          <Route path="/products">products</Route>

          <Route path="/orders">
            <OrdersDashboard />
          </Route>

          <Route path="/settings">settings</Route>
        </Switch>
      </DashboardLayout>
    </Box>
  );
}
