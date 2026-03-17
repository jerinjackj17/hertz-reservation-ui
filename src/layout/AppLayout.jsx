import { NavLink } from "react-router-dom";

function AppLayout({ children }) {

  // shared nav styling
  const navItem = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-premium-accent text-white"
        : "text-premium-textSecondary hover:bg-premium-border hover:text-premium-textPrimary"
    }`;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#1c1c1c]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-premium-card border-r border-premium-border flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-premium-border">
          <h1 className="text-lg font-semibold text-premium-textPrimary tracking-tight">
            Hertz Reservation
          </h1>
        </div>

        <div className="flex-1 px-4 py-6 space-y-8">

          {/* Customers Section */}
          <div>
            <p className="text-xs uppercase tracking-wider text-premium-textSecondary mb-3">
              Customers
            </p>

            <div className="flex flex-col gap-2">
              <NavLink to="/customers" end className={navItem}>
                Create
              </NavLink>

              <NavLink to="/customers/view" className={navItem}>
                View
              </NavLink>
            </div>
          </div>

          {/* Vehicles Section */}
          <div>
            <p className="text-xs uppercase tracking-wider text-premium-textSecondary mb-3">
              Vehicles
            </p>

            <div className="flex flex-col gap-2">
              <NavLink to="/vehicles" end className={navItem}>
                Create
              </NavLink>

              <NavLink to="/vehicles/view" className={navItem}>
                View
              </NavLink>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <p className="text-xs uppercase tracking-wider text-premium-textSecondary mb-3">
              Products
            </p>

            <div className="flex flex-col gap-2">
              <NavLink to="/eligible" className={navItem}>
                Eligibility
              </NavLink>
            </div>
          </div>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 bg-premium-page">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;