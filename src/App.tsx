import { Route, Routes } from 'react-router-dom';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { HomePage } from './routes/HomePage';
import { EventsPage } from './routes/EventsPage';
import { MerchandisePage } from './routes/MerchandisePage';
import { CampIgnitePage } from './routes/CampIgnitePage';
import { CampAccountPage } from './routes/CampAccountPage';
import { VolunteerPage } from './routes/VolunteerPage';
import { MembersPage } from './routes/MembersPage';
import { BiblePage } from './routes/BiblePage';
import { useScrollToHash } from './hooks/useScrollToHash';

export default function App() {
  useScrollToHash();

  return (
    <>
      <LoadingScreen />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/merchandise" element={<MerchandisePage />} />
        <Route path="/camp-ignite" element={<CampIgnitePage />} />
        <Route path="/camp-account" element={<CampAccountPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/bible" element={<BiblePage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
