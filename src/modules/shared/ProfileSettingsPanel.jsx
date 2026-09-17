import { useState, useEffect } from 'react';

const API_BASE = '/api';

export default function ProfileSettingsPanel({ user, token, onProfileUpdated }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    idNumber: user?.idNumber || '',
    address: user?.address || '',
    city: user?.city || '',
    province: user?.province || '',
    country: user?.country || 'South Africa'
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      idNumber: user?.idNumber || '',
      address: user?.address || '',
      city: user?.city || '',
      province: user?.province || '',
      country: user?.country || 'South Africa'
    });
  }, [user]);

  async function handleProfileUpdate(event) {
    event.preventDefault();
    setSaving(true);
    setProfileMessage('');

    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload.message || 'Unable to save profile details.');
      }

      setProfileMessage('Profile updated successfully.');
      if (onProfileUpdated) onProfileUpdated(payload.data);
    } catch (error) {
      setProfileMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordUpdate(event) {
    event.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match.');
      setPasswordSaving(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters long.');
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload.message || 'Unable to change password.');
      }

      setPasswordMessage('Password updated successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordMessage(error.message);
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <section className="panel" id="settings">
      <div className="panel-header">
        <h2>Profile settings</h2>
      </div>

      <div className="settings-grid">
        <form className="settings-form" onSubmit={handleProfileUpdate}>
          <h3>Personal details</h3>

          <label>
            Full name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>

          <label>
            Email address
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>

          <label>
            South African ID number
            <input
              value={form.idNumber}
              onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
              placeholder="0000000000000"
            />
          </label>

          <label>
            Mobile number
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+27 82 123 4567"
            />
          </label>

          <label>
            Street address
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>

          <div className="inline-fields">
            <label>
              City
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </label>
            <label>
              Province
              <input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} />
            </label>
          </div>

          <label>
            Country
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </label>

          {profileMessage && <div className="status-banner">{profileMessage}</div>}

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? 'Saving...' : 'Save profile'}
          </button>
        </form>

        <form className="settings-form" onSubmit={handlePasswordUpdate}>
          <h3>Change password</h3>

          <label>
            Current password
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />
          </label>

          <label>
            New password
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />
          </label>

          <label>
            Confirm new password
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            />
          </label>

          {passwordMessage && <div className="status-banner">{passwordMessage}</div>}

          <button type="submit" className="primary-button secondary" disabled={passwordSaving}>
            {passwordSaving ? 'Updating...' : 'Change password'}
          </button>
        </form>
      </div>
    </section>
  );
}
