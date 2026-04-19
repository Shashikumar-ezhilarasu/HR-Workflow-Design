import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Designer } from './pages/Designer';
import { Documentation } from './pages/Documentation';
import { PlaceholderPage } from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentation" element={<Documentation />} />
        
        {/* Main Application Routes */}
        <Route path="/designer" element={<Designer />} />
        <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
        <Route path="/compliance" element={<PlaceholderPage title="Compliance" />} />
        <Route path="/scheduler" element={<PlaceholderPage title="Scheduler" />} />
        <Route path="/automation" element={<PlaceholderPage title="Automation" />} />
        <Route path="/integrations" element={<PlaceholderPage title="Integrations" />} />
        <Route path="/repository" element={<PlaceholderPage title="Repository" />} />
        <Route path="/resources" element={<PlaceholderPage title="Resources" />} />
        <Route path="/member" element={<PlaceholderPage title="Member" />} />
        <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
