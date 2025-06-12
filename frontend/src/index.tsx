import React from 'react';
import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/routes';
import { AuthProvider } from './contexts/authContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);