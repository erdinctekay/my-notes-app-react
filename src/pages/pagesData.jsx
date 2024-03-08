import Dashboard from './Dashboard'
import { Login, Logout, Register } from './Auth'
import NotFound from './404'

const pagesData = [
	{
		path: 'dashboard',
		element: <Dashboard />,
		title: 'dashboard',
		authRequired: true,
	},
	{
		path: 'auth/login',
		element: <Login />,
		title: 'login',
		nonAuthRequired: true,
	},
	{
		path: 'auth/register',
		element: <Register />,
		title: 'register',
		nonAuthRequired: true,
	},
	{
		path: 'auth/logout',
		element: <Logout />,
		title: 'logout',
		authRequired: true,
	},
	{
		path: '404',
		element: <NotFound />,
		title: '404',
	},
]

export default pagesData
