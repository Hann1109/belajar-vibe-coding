import { useState, useEffect } from 'react';
import { Waves } from 'lucide-react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Notification } from './components/Notification';

function App() {
  // State Utama
  const [phLevel, setPhLevel] = useState<number>(7.0); // pH awal optimal
  const [schedules, setSchedules] = useState<string[]>(['08:00', '17:00']);
  const [isFeeding, setIsFeeding] = useState<boolean>(false);
  const [feedSuccess, setFeedSuccess] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Status Auto Feed bergantung pada pH
  const isAutoFeedActive = phLevel >= 5.5;

  // Efek memonitor pH untuk trigger notifikasi keamanan
  useEffect(() => {
    if (phLevel < 5.5) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [phLevel]);

  // Handler untuk memberi makan ikan secara manual
  const handleManualFeed = () => {
    setIsFeeding(true);
    // Simulasi proses memberi makan selama 1 detik
    setTimeout(() => {
      setIsFeeding(false);
      setFeedSuccess(true);
      
      // Sembunyikan pesan sukses setelah 3 detik
      setTimeout(() => {
        setFeedSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Handler untuk menambah jadwal
  const handleAddSchedule = (time: string) => {
    setSchedules([...schedules, time]);
  };

  // Handler untuk menghapus jadwal
  const handleRemoveSchedule = (timeToRemove: string) => {
    setSchedules(schedules.filter(time => time !== timeToRemove));
  };

  // Handler Simulasi pH (Mocks)
  const simulateLowPh = () => setPhLevel(5.2);
  const simulateNormalPh = () => setPhLevel(7.0);

  return (
    <div className="app-container">
      {/* Background Ornamen */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Header Utama */}
      <header className="app-header">
        <Waves className="header-icon" size={28} />
        <h1>Smart Aquarium IoT</h1>
      </header>

      {/* Konten Utama Grid */}
      <main className="main-content">
        <Dashboard 
          phLevel={phLevel}
          schedules={schedules}
          isAutoFeedActive={isAutoFeedActive}
          onManualFeed={handleManualFeed}
          onAddSchedule={handleAddSchedule}
          onRemoveSchedule={handleRemoveSchedule}
          isFeeding={isFeeding}
          feedSuccess={feedSuccess}
        />

        {/* Kontrol Simulasi (Hanya untuk keperluan demo/testing) */}
        <div className="sim-controls">
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Panel Simulasi IoT:</span>
          <button className="btn-sim btn-sim-danger" onClick={simulateLowPh}>
            Set pH &lt; 5.5 (Kritis)
          </button>
          <button className="btn-sim btn-sim-safe" onClick={simulateNormalPh}>
            Set pH Normal (7.0)
          </button>
        </div>
      </main>

      {/* Notifikasi Overlay jika pH Kritis */}
      <Notification 
        show={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </div>
  );
}

export default App;
