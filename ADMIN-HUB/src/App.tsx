import { Route, Routes } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import { LoginPage } from './routes/LoginPage';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { OverviewPage } from './routes/OverviewPage';
import { CampRegistrantsPage } from './routes/CampRegistrantsPage';
import { EventRegistrationsPage } from './routes/EventRegistrationsPage';
import { MerchandiseOrdersPage } from './routes/MerchandiseOrdersPage';
import { VolunteersPage } from './routes/VolunteersPage';

export default function App() {
  const { state, signOut } = useAdminAuth();

  if (state.status === 'loading') {
    return (
      <div className="login-page">
        <p className="small-note">Loading...</p>
      </div>
    );
  }

  if (state.status === 'signed-out') {
    return <LoginPage />;
  }

  if (state.status === 'not-admin') {
    return <LoginPage notAdmin onSignOut={signOut} />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar email={state.email} onSignOut={signOut} />
      <main className="admin-main admin-content">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/camp-ignite" element={<CampRegistrantsPage />} />
          <Route path="/events" element={<EventRegistrationsPage />} />
          <Route path="/merchandise" element={<MerchandiseOrdersPage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
        </Routes>
      </main>
    </div>
  );
}
