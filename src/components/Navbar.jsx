import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: '📋 Notice Board' },
  { to: '/prep', label: '🗓️ Prep Roadmap' },
  { to: '/reading', label: '📖 Reading' },
  { to: '/topics', label: '✅ Topics' },
];

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300 sticky top-0 z-30">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-300">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active font-semibold' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-lg font-bold font-serif tracking-tight text-primary">
          CSE Board
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full text-xs font-semibold tracking-wide px-4 ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md shadow-primary/25'
                      : 'hover:bg-primary/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
