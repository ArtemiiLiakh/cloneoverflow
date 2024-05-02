import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import { Home } from '../pages/home';
import UserProfile from '../pages/user';
import { PrivateRoute } from './PrivateRoute';
import HomePage from '../pages/home/pages/homePage';
import QuestionPage from '../pages/home/pages/questionPage';
import TagsPage from '../pages/home/pages/tagsPage';
import AskQuestion from '../pages/askQuestion';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { 
        path: '/', element: <Home/>, children: [
          { path: '/', element: <HomePage/> },
          { path: '/questions', element: <QuestionPage/>},
          { path: '/tags', element: <TagsPage/> },
        ]
      },
      { path: '/questions/ask', element: <PrivateRoute><AskQuestion/></PrivateRoute>},
      { path: '/auth/login', element: <Login/> },
      { path: '/auth/signup', element: <Signup/> },
      { path: '/user/:userId', element: <PrivateRoute><UserProfile/></PrivateRoute>}
    ],
  }
]);