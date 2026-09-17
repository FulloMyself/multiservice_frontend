import ProfileSettingsPanel from '../shared/ProfileSettingsPanel';

export default function AdminDashboardPage({ user, token, onLogout, onProfileUpdated }) {
  const stats = [
    { label: 'Total users', value: '128' },
    { label: 'Active providers', value: '24' },
    { label: 'Bookings', value: '351' },
    { label: 'Monthly revenue', value: 'R 89,420' }
  ];

  const activity = [
    'New provider verification request received',
    'Customer wallet top-up approved',
    'Service category updated: Home Services',
    'Dispute escalation pending manual review'
  ];

  const management = [
    { title: 'Provider verification', value: '7 pending' },
    { title: 'Service approval queue', value: '12 items' },
    { title: 'Account reviews', value: '3 flagged' },
    { title: 'Compliance checkups', value: '5 due this week' }
  ];

  const finance = [
    { label: 'Gross platform revenue', value: 'R 89,420' },
    { label: 'Commission collected', value: 'R 23,650' },
    { label: 'Payout requests', value: 'R 14,900' }
  ];

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Admin workspace</span>
          <h1>Welcome, {user?.name || 'Administrator'}</h1>
        </div>

        <div className="topbar-actions">
          <span className="pill">{user?.role || 'admin'}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <nav className="nav-links">
        <a href="#overview">Overview</a>
        <a href="#providers">Providers</a>
        <a href="#bookings">Bookings</a>
        <a href="#finance">Finance</a>
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
        <div className="panel">
          <div className="panel-header">
            <h2>Platform activity</h2>
          </div>
          <ul className="list-panel">
            {activity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="panel" id="providers">
          <div className="panel-header">
            <h2>Moderation queue</h2>
          </div>
          <div className="stacked-cards">
            <div className="mini-box">
              <strong>7</strong>
              <span>Provider verification requests</span>
            </div>
            <div className="mini-box">
              <strong>4</strong>
              <span>Open disputes</span>
            </div>
            <div className="mini-box">
              <strong>2</strong>
              <span>Payout approvals pending</span>
            </div>
          </div>
        </div>
      </section>

      <section className="two-column-layout">
        <div className="panel" id="bookings">
          <div className="panel-header">
            <h2>Management overview</h2>
          </div>
          <div className="stacked-cards">
            {management.map((item) => (
              <div className="mini-box" key={item.title}>
                <strong>{item.value}</strong>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" id="finance">
          <div className="panel-header">
            <h2>Finance snapshot</h2>
          </div>
          <ul className="list-panel">
            {finance.map((item) => (
              <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
            ))}
          </ul>
        </div>
      </section>

      <ProfileSettingsPanel user={user} token={token} onProfileUpdated={onProfileUpdated} />
    </div>
  );
}
