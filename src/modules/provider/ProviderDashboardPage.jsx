import ProfileSettingsPanel from '../shared/ProfileSettingsPanel';

export default function ProviderDashboardPage({ user, token, onLogout, onProfileUpdated }) {
  const stats = [
    { label: 'Open bookings', value: '12' },
    { label: 'Earnings this month', value: 'R 18,500' },
    { label: 'Completed jobs', value: '42' },
    { label: 'Rating', value: '4.9/5' }
  ];

  const serviceSummary = [
    { title: 'Available slots', value: '18' },
    { title: 'Response time', value: '1.4 hrs' },
    { title: 'Pending jobs', value: '6' },
    { title: 'Repeat clients', value: '31' }
  ];

  const bookings = [
    { service: 'Plumbing emergency', date: 'Today · 16:00', customer: 'Mpho S.' },
    { service: 'Electrical inspection', date: 'Thu · 11:30', customer: 'Lerato K.' },
    { service: 'Aircon servicing', date: 'Sat · 09:15', customer: 'David C.' }
  ];

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Provider workspace</span>
          <h1>Provider dashboard</h1>
        </div>

        <div className="topbar-actions">
          <span className="pill">{user?.role || 'provider'}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <nav className="nav-links">
        <a href="#overview">Overview</a>
        <a href="#bookings">Bookings</a>
        <a href="#earnings">Earnings</a>
        <a href="#calendar">Calendar</a>
        <a href="#settings">Settings</a>
      </nav>

      <section className="stats-grid" id="overview">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="two-column-layout">
        <div className="panel" id="bookings">
          <div className="panel-header">
            <h2>Upcoming jobs</h2>
          </div>
          <div className="stacked-cards">
            {bookings.map((booking) => (
              <div className="booking-row" key={`${booking.service}-${booking.date}`}>
                <div>
                  <strong>{booking.service}</strong>
                  <small>{booking.customer}</small>
                </div>
                <span>{booking.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" id="earnings">
          <div className="panel-header">
            <h2>Service performance</h2>
          </div>
          <div className="stacked-cards">
            {serviceSummary.map((item) => (
              <div className="mini-box" key={item.title}>
                <strong>{item.value}</strong>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" id="calendar">
        <div className="panel-header">
          <h2>Availability calendar</h2>
        </div>
        <ul className="list-panel">
          <li>Monday: 8:00–17:00 booked for on-site maintenance</li>
          <li>Tuesday: 9:00–13:00 available for new jobs</li>
          <li>Wednesday: emergency callout slots open</li>
          <li>Friday: high-demand window with limited availability</li>
        </ul>
      </section>

      <ProfileSettingsPanel user={user} token={token} onProfileUpdated={onProfileUpdated} />
    </div>
  );
}
