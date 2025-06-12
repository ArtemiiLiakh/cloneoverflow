import * as React from 'react';

import { App } from '@/App';
import AskQuestion from '@/pages/askQuestion';
import Signup from '@/pages/auth/createAccount';
import Login from '@/pages/auth/login';
import { Home } from '@/pages/home';
import HomeTab from '@/pages/home/pages/homeTab';
import QuestionListTab from '@/pages/home/pages/questionListTab';
import TagsTab from '@/pages/home/pages/tagsTab';
import EditQuestionPage from '@/pages/question/editQuestionPage';
import QuestionPage from '@/pages/question/questionPage';
import UserProfile from '@/pages/user';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import FavoriteListTab from '@/pages/home/pages/favoriteListTab';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', element: <Home />, children: [
          { path: '/', element: <HomeTab /> },
          { path: '/questions', element: <QuestionListTab /> },
          { path: '/questions/favorite', element: <FavoriteListTab/> },
          { path: '/questions/:questionId', element: <QuestionPage /> },
          { path: '/tags', element: <TagsTab /> },
        ]
      },
      { path: '/questions/:questionId/edit', element: <PrivateRoute><EditQuestionPage /></PrivateRoute> },
      { path: '/questions/ask', element: <PrivateRoute><AskQuestion /></PrivateRoute> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/signup', element: <Signup /> },
      { path: '/users/:userId', element: <PrivateRoute><UserProfile/></PrivateRoute> }
    ],
  }
]);