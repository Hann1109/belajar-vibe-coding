import { useState } from 'react';
import { Droplet, Clock, Utensils, Plus, Trash2, Fish } from 'lucide-react';

interface DashboardProps {
  phLevel: number;
  schedules: string[];
  isAutoFeedActive: boolean;
  onManualFeed: () => void;
  onAddSchedule: (time: string) => void;
  onRemoveSchedule: (time: string) => void;
  isFeeding: boolean;
  feedSuccess: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  phLevel,
  schedules,
  isAutoFeedActive,
  onManualFeed,
  onAddSchedule,
  onRemoveSchedule,
  isFeeding,
  feedSuccess
}) => {
  const [timeInput, setTimeInput] = useState('');

  // Menentukan status visual pH berdasarkan nilainya
  const getPhStatus = () => {
    if (phLevel < 5.5) return { class: 'ph-danger', text: 'Kritis (Terlalu Asam)' };
    if (phLevel > 8.5) return { class: 'ph-warning', text: 'Peringatan (Basa)' };
    return { class: 'ph-safe', text: 'Optimal (Aman)' };
  };

  const phStatus = getPhStatus();

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeInput && !schedules.includes(timeInput)) {
      onAddSchedule(timeInput);
      setTimeInput('');
    }
  };

  return (
    <>
      {/* Kartu Status pH */}
      <div className="card">
        <div className="card-title">
          <Droplet size={20} color="var(--primary)" />
          Status pH Air
        </div>
        <div className="ph-display">
          <div className={`ph-circle ${phStatus.class}`}>
            {phLevel.toFixed(1)}
          </div>
          <div className="ph-status-text" style={{ color: `var(--${phStatus.class === 'ph-safe' ? 'success' : phStatus.class === 'ph-warning' ? 'accent' : 'danger'})` }}>
            {phStatus.text}
          </div>
        </div>
      </div>

      {/* Kartu Manual Feed */}
      <div className="card">
        <div className="card-title">
          <Utensils size={20} color="var(--primary)" />
          Pemberian Makan Manual
        </div>
        <div className="feed-action">
          <button 
            className={`btn-feed ${isFeeding ? 'feeding-animation' : ''}`}
            onClick={onManualFeed}
            disabled={isFeeding}
          >
            <Fish size={24} />
            {isFeeding ? 'Memberi Makan...' : 'Beri Makan Ikan'}
          </button>
          <div className={`feed-status ${feedSuccess ? 'visible' : ''}`}>
            Ikan berhasil diberi makan! ✓
          </div>
        </div>
      </div>

      {/* Kartu Jadwal Otomatis */}
      <div className="card schedule-manager">
        <div className="card-title" style={{ width: '100%', marginBottom: '0.5rem' }}>
          <Clock size={20} color="var(--primary)" />
          Jadwal Makan Otomatis
        </div>
        
        <form className="schedule-form" onSubmit={handleAddSchedule}>
          <div className="input-group">
            <label htmlFor="time">Tambah Waktu (HH:MM)</label>
            <input 
              type="time" 
              id="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="time-input"
              disabled={!isAutoFeedActive}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-add"
            disabled={!isAutoFeedActive || !timeInput}
          >
            <Plus size={18} />
            Tambah
          </button>
        </form>

        <div className="schedule-list-container">
          <div className="input-group">
            <label>Daftar Jadwal {!isAutoFeedActive && '(Nonaktif)'}</label>
            {schedules.length === 0 ? (
              <div className="no-schedule">Belum ada jadwal yang diatur.</div>
            ) : (
              <ul className="schedule-list">
                {schedules.sort().map((time) => (
                  <li key={time} className={`schedule-item ${!isAutoFeedActive ? 'disabled' : ''}`}>
                    <Clock size={14} />
                    {time}
                    <button 
                      type="button" 
                      className="btn-remove"
                      onClick={() => onRemoveSchedule(time)}
                      title="Hapus jadwal"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
