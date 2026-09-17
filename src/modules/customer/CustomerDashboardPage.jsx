import ProfileSettingsPanel from '../shared/ProfileSettingsPanel';

export default function CustomerDashboardPage({ user, token, onLogout, onProfileUpdated }) {
  const upcomingBookings = [
    { service: 'Home Cleaning', date: 'Tue, 10:00', provider: 'Sarah Plumber' },
    { service: 'AC Repair', date: 'Wed, 14:00', provider: 'Cool Air Works' },
    { service: 'Garden Styling', date: 'Fri, 09:30', provider: 'Green Leaf Co.' }
  ];

  const walletSummary = [
    { label: 'Wallet balance', value: 'R 1,250.00' },
    { label: 'Available credits', value: '250 VC' },
    { label: 'Rewards earned', value: 'R 180.00' }
  ];

  const favourites = [
    'EcoClean Home Care',
    'Fix-It Plumbing',
    'Nelspruit Mobile Detailing'
  ];

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Customer workspace</span>
          <h1>Welcome back, {user?.name || 'Customer'}</h1>
        </div>

        <div className="topbar-actions">
          <span className="pill">{user?.role || 'customer'}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <nav className="nav-links">
        <a href="#overview">Overview</a>
        <a href="#bookings">Bookings</a>
        <a href="#wallet">Wallet</a>
        <a href="#favourites">Favourites</a>
        <a href="#settings">Settings</a>
      </nav>

      <section className="stats-grid" id="overview">
        {walletSummary.map((item) => (
          <div className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="two-column-layout">
        <div className="panel" id="bookings">
          <div className="panel-header">
            <h2>Upcoming bookings</h2>
          </div>

          <div className="stacked-cards">
            {upcomingBookings.map((booking) => (
              <div className="booking-row" key={`${booking.service}-${booking.date}`}>
                <div>
                  <strong>{booking.service}</strong>
                  <small>{booking.provider}</small>
                </div>
                <span>{booking.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" id="wallet">
          <div className="panel-header">
            <h2>Wallet activity</h2>
          </div>
          <ul className="list-panel">
            <li>Top-up approved for R 500.00</li>
            <li>Service payment processed successfully</li>
            <li>Reward voucher available for next booking</li>
          </ul>
        </div>
      </section>

      <section className="two-column-layout">
        <div className="panel" id="favourites">
          <div className="panel-header">
            <h2>Saved providers</h2>
          </div>
          <div className="stacked-cards">
            {favourites.map((provider) => (
              <div className="mini-box" key={provider}>
                <strong>{provider}</strong>
                <span>Preferred service partner</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Service preferences</h2>
          </div>
          <ul className="list-panel">
            <li>Home maintenance and repairs</li>
            <li>Emergency same-day appointments</li>
            <li>Preferred province: Gauteng</li>
          </ul>
        </div>
      </section>

      <ProfileSettingsPanel user={user} token={token} onProfileUpdated={onProfileUpdated} />
    </div>
  );
}
