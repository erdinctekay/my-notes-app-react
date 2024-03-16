import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ColorSchemeToggler from './ColorSchemeToggler'

const Header = () => {
	const account = useSelector((state) => state.account.account)

	return (
		<header>
			<section>
				<NavLink to="/">
					<strong style={{ color: 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-700, #32383E))' }}>
						LOGO
					</strong>
				</NavLink>
				<div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
					{account ? (
						<>
							<small>{account.email}</small>
							<span>&nbsp;—&nbsp;</span>
							<NavLink to="/auth/logout">
								<small>logout</small>
							</NavLink>
						</>
					) : (
						<small>Not logged in</small>
					)}
					<span>&nbsp;|&nbsp;</span>
					<ColorSchemeToggler />
				</div>
			</section>
		</header>
	)
}

export default Header
