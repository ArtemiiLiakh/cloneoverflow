import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import { Home } from '../pages/home';
import UserProfile from '../pages/user';
import { PrivateRoute } from './PrivateRoute';
import HomeTab from '../pages/home/pages/homeTab';
import QuestionListTab from '../pages/home/pages/questionListTab';
import TagsPage from '../pages/home/pages/tagsTab';
import AskQuestion from '../pages/askQuestion';
import QuestionPage from '../pages/question/questionPage';
import EditQuestionPage from '../pages/question/editQuestionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', element: <Home />, children: [
          { path: '/', element: <HomeTab /> },
          { path: '/questions', element: <QuestionListTab /> },
          { path: '/questions/:questionId', element: <QuestionPage /> },
          { path: '/tags', element: <TagsPage /> },
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