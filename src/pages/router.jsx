import { Route, Routes, Navigate } from 'react-router-dom'
import pagesData from './pagesData'
import AuthRequired from '@/components/AuthRequired'
import NonAuthRequired from '@/components/NonAuthRequired'

const Router = () => {
	const nonAuthRequiredRoutes = pagesData
		.filter(({ nonAuthRequired }) => nonAuthRequired)
		.map(({ path, title, element }) => <Route key={title} path={`/${path}`} element={element} />)

	const authRequiredRoutes = pagesData
		.filter(({ authRequired }) => authRequired)
		.map(({ path, title, element }) => <Route key={title} path={`/${path}`} element={element} />)

	const otherRoutes = pagesData
		.filter(({ authRequired, nonAuthRequired }) => !authRequired && !nonAuthRequired)
		.map(({ path, title, element }) => <Route key={title} path={`/${path}`} element={element} />)

	console.log(nonAuthRequiredRoutes)

	const pageRoutes = [
		<Route key="nonAuthRequired" element={<NonAuthRequired />}>
			{nonAuthRequiredRoutes}
		</Route>,
		<Route key="authRequired" element={<AuthRequired />}>
			{authRequiredRoutes}
		</Route>,
		...otherRoutes,
	]

	console.log(pageRoutes)

	return (
		<Routes>
			{pageRoutes}
			<Route path="/" element={<Navigate to="/dashboard" />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	)
}

export default Router
