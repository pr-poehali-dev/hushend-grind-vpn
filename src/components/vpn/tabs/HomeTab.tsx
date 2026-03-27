import Icon from "@/components/ui/icon";

interface Server {
  id: number;
  country: string;
  city: string;
  ping: number;
  load: number;
  premium: boolean;
}

interface HomeTabProps {
  connected: boolean;
  connecting: boolean;
  selectedServer: Server;
  protocol: string;
  dataUsed: number;
  upTime: number;
  handleConnect: () => void;
  formatTime: (s: number) => string;
}

export default function HomeTab({
  connected,
  connecting,
  selectedServer,
  protocol,
  dataUsed,
  upTime,
  handleConnect,
  formatTime,
}: HomeTabProps) {
  return (
    <div className="animate-fade-slide-up">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-6" style={{ width: 148, height: 148 }}>

          {/* Орбитальные точки при подключении */}
          {connecting && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Хвосты точки 1 */}
              <div className="orbit-tail1c absolute w-2 h-2 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail1b absolute w-2.5 h-2.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail1a absolute w-3 h-3 rounded-full" style={{ background: "#00C8FF" }} />
              {/* Точка 1 */}
              <div className="orbit-dot1 absolute w-3.5 h-3.5 rounded-full" style={{ background: "#00E5FF", boxShadow: "0 0 10px #00E5FF, 0 0 20px rgba(0,229,255,0.6)" }} />
              {/* Хвосты точки 2 */}
              <div className="orbit-tail2c absolute w-2 h-2 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail2b absolute w-2.5 h-2.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail2a absolute w-3 h-3 rounded-full" style={{ background: "#00C8FF" }} />
              {/* Точка 2 */}
              <div className="orbit-dot2 absolute w-3.5 h-3.5 rounded-full" style={{ background: "#00E5FF", boxShadow: "0 0 10px #00E5FF, 0 0 20px rgba(0,229,255,0.6)" }} />
            </div>
          )}

          {/* Свечение при подключённом состоянии */}
          {connected && (
            <>
              <div className="absolute inset-0 rounded-full animate-pulse-ring2" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent)" }} />
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.28), transparent)" }} />
            </>
          )}

          <button
            onClick={handleConnect}
            className={`relative w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-500 ${connected ? "glow-button-cyan" : "glow-button-idle"}`}
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            {connecting ? (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold tracking-widest" style={{ color: "rgba(0,229,255,0.8)" }}>ПОДКЛЮЧЕНИЕ</span>
              </div>
            ) : (
              <>
                <Icon name={connected ? "ShieldCheck" : "Power"} size={34} color={connected ? "white" : "rgba(0,200,255,0.7)"} />
                <span className="font-black text-sm tracking-widest mt-2" style={{ color: connected ? "white" : "rgba(0,200,255,0.65)" }}>
                  {connected ? "ОТКЛЮЧИТЬ" : "ПОДКЛЮЧИТЬ"}
                </span>
              </>
            )}
          </button>
        </div>

        {connected && (
          <div className="text-center animate-fade-slide-up">
            <div className="text-2xl font-black" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-cyan)" }}>
              {formatTime(upTime)}
            </div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Время подключения</div>
          </div>
        )}
      </div>

      <div className="glass-card neon-border rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(77,159,255,0.12)" }}>
              {selectedServer.country.split(" ")[0]}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{selectedServer.country.split(" ").slice(1).join(" ")}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedServer.city}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold" style={{ color: selectedServer.ping < 50 ? "var(--neon-green)" : selectedServer.ping < 100 ? "var(--neon-blue)" : "#FF6B6B" }}>
              {selectedServer.ping} мс
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>пинг</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Режим", value: "Stealth", icon: "EyeOff", color: "var(--neon-purple)" },
          { label: "Протокол", value: protocol, icon: "Lock", color: "var(--neon-blue)" },
          { label: "Данные", value: `${dataUsed.toFixed(1)} ГБ`, icon: "Activity", color: "var(--neon-cyan)" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-3 text-center neon-border">
            <Icon name={s.icon} size={18} color={s.color} />
            <div className="font-bold text-xs mt-1 text-white">{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(155,89,255,0.15), rgba(77,159,255,0.1))", border: "1px solid rgba(155,89,255,0.25)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(155,89,255,0.2)" }}>
            <Icon name="EyeOff" size={20} color="var(--neon-purple)" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-white">Скрытый режим активен</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Трафик маскируется под HTTPS</div>
          </div>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon-green)" }} />
        </div>
      </div>

      <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)" }}>
        <div className="flex items-center gap-3">
          <Icon name="Shield" size={20} color="var(--neon-cyan)" />
          <div className="flex-1">
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Ваш IP скрыт</div>
            <div className="font-mono font-bold text-sm" style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}>
              {connected ? "185.220.101.XX" : "— — . — — . — — . — —"}
            </div>
          </div>
          <div className="text-xs px-2 py-1 rounded-lg font-bold" style={{ background: connected ? "rgba(0,255,136,0.15)" : "rgba(255,107,107,0.15)", color: connected ? "var(--neon-green)" : "#FF6B6B" }}>
            {connected ? "ЗАЩИЩЁН" : "ОТКРЫТ"}
          </div>
        </div>
      </div>
    </div>
  );
}
