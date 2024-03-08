import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NonAuthRequired = () => {
	const navigate = useNavigate()
	const account = useSelector((state) => state.account.account)

	useEffect(() => {
		if (account) {
			return navigate('/dashboard')
		}
	}, [account, navigate])

	return <Outlet />
}

export default NonAuthRequired
