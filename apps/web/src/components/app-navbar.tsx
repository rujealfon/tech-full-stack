import { Link, useLocation } from "@tanstack/react-router";

export default function AppNavbar() {
  const location = useLocation();
  return (
    <nav className="container">
      <ul>
        <li><strong>Tasks App</strong></li>
      </ul>
      <ul>
        {location.pathname !== "/" && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
