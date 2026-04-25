import React, { useState } from 'react';
import Ticker from './components/Ticker';
import Header from './components/Header';
import NavTabs from './components/NavTabs';
import PredictionsTab from './components/PredictionsTab';
import PartiesTab from './components/PartiesTab';
import FeaturesTab from './components/FeaturesTab';
import ModelsTab from './components/ModelsTab';
import HistoryTab from './components/HistoryTab';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('predictions');
  const [selectedParty, setSelectedParty] = useState('DMK');

  const handlePartySelect = (name) => {
    setSelectedParty(name);
    setActiveTab('parties');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Ticker />
      <Header />
      <NavTabs active={activeTab} onChange={setActiveTab} />

      <main>
        {activeTab === 'predictions' && (
          <PredictionsTab onPartySelect={handlePartySelect} />
        )}
        {activeTab === 'parties' && (
          <PartiesTab selectedParty={selectedParty} onSelect={setSelectedParty} />
        )}
        {activeTab === 'features' && <FeaturesTab />}
        {activeTab === 'models'   && <ModelsTab />}
        {activeTab === 'history'  && <HistoryTab />}
      </main>

      <Footer />
    </div>
  );
}
