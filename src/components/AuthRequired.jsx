import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRequired = () => {
	const navigate = useNavigate()
	const account = useSelector((state) => state.account.account)

	useEffect(() => {
		if (!account) {
			return navigate('/auth/login')
		}
	}, [account, navigate])

	return <Outlet />
}

export default AuthRequired
