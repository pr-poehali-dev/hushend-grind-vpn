import Icon from "@/components/ui/icon";

interface ConnectTabProps {
  connected: boolean;
  connecting: boolean;
  handleConnect: () => void;
}

export default function ConnectTab({ connected, connecting, handleConnect }: ConnectTabProps) {
  return (
    <div className="animate-fade-slide-up py-4">
      <h2 className="text-xl font-black text-white mb-1">Подключение</h2>
      <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Скрытый режим обхода блокировок</p>

      <div className="flex flex-col items-center mb-8">
        <div className="relative flex items-center justify-center" style={{ width: 168, height: 168 }}>
          {/* Атмосферное свечение */}
          <div className="absolute rounded-full animate-ambient" style={{
            width: 168, height: 168,
            background: connecting
              ? "radial-gradient(circle, rgba(0,200,255,0.14) 0%, rgba(0,160,255,0.05) 50%, transparent 70%)"
              : connected
                ? "radial-gradient(circle, rgba(0,210,255,0.2) 0%, rgba(0,160,255,0.08) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 65%)",
          }} />
          {/* SVG орбиты */}
          {connecting && (
            <>
              <svg width={152} height={152} viewBox="0 0 152 152" className="orbit-svg-1" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient id="cometC1" gradientUnits="userSpaceOnUse" x1="146" y1="76" x2="76" y2="6">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                    <stop offset="60%" stopColor="#00CCFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                  </linearGradient>
                  <filter id="blurC1"><feGaussianBlur stdDeviation="1" /></filter>
                </defs>
                <circle cx="76" cy="76" r="70" fill="none" stroke="rgba(0,200,255,0.06)" strokeWidth="1" />
                <circle cx="76" cy="76" r="70" fill="none" stroke="url(#cometC1)" strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 70 * 0.34} ${2 * Math.PI * 70 * 0.66}`}
                  strokeLinecap="round" filter="url(#blurC1)" opacity="0.9" />
                <circle cx="146" cy="76" r="3.5" fill="#00E8FF" filter="url(#blurC1)" opacity="0.95" />
                <circle cx="146" cy="76" r="2" fill="white" opacity="0.9" />
              </svg>
              <svg width={152} height={152} viewBox="0 0 152 152" className="orbit-svg-2" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient id="cometC2" gradientUnits="userSpaceOnUse" x1="6" y1="76" x2="76" y2="146">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                    <stop offset="60%" stopColor="#00CCFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                  </linearGradient>
                  <filter id="blurC2"><feGaussianBlur stdDeviation="1" /></filter>
                </defs>
                <circle cx="76" cy="76" r="70" fill="none" stroke="rgba(0,200,255,0.06)" strokeWidth="1" />
                <circle cx="76" cy="76" r="70" fill="none" stroke="url(#cometC2)" strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 70 * 0.34} ${2 * Math.PI * 70 * 0.66}`}
                  strokeLinecap="round" filter="url(#blurC2)" opacity="0.9" />
                <circle cx="6" cy="76" r="3.5" fill="#00E8FF" filter="url(#blurC2)" opacity="0.95" />
                <circle cx="6" cy="76" r="2" fill="white" opacity="0.9" />
              </svg>
            </>
          )}
          {connected && (
            <>
              <div className="absolute rounded-full animate-pulse-ring" style={{ width: 144, height: 144, border: "1px solid rgba(0,210,255,0.3)" }} />
              <div className="absolute rounded-full animate-pulse-ring2" style={{ width: 144, height: 144, border: "1px solid rgba(0,180,255,0.18)" }} />
            </>
          )}
          <button
            onClick={handleConnect}
            className={`relative rounded-full flex flex-col items-center justify-center transition-all duration-500 ${connected ? "glow-button-cyan" : "glow-button-idle"}`}
            style={{ width: 128, height: 128 }}
          >
            <div className="absolute inset-0 rounded-full" style={{
              background: connected
                ? "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18) 0%, transparent 60%)"
                : "radial-gradient(circle at 40% 35%, rgba(0,220,255,0.07) 0%, transparent 60%)",
            }} />
            {connecting ? (
              <span className="relative text-xs font-bold tracking-widest" style={{ color: "rgba(0,229,255,0.9)", letterSpacing: "0.18em" }}>ЗАПУСК</span>
            ) : (
              <div className="relative flex flex-col items-center gap-1">
                <Icon name={connected ? "ShieldCheck" : "Power"} size={30} color={connected ? "rgba(255,255,255,0.95)" : "rgba(0,210,255,0.72)"} />
                <span className="font-black text-xs tracking-widest" style={{ color: connected ? "rgba(255,255,255,0.9)" : "rgba(0,200,255,0.6)" }}>
                  {connected ? "ОТКЛЮЧИТЬ" : "СТАРТ"}
                </span>
              </div>
            )}
          </button>
        </div>
        <div className="mt-4 text-center">
          <div className={`font-black text-lg ${connected ? "gradient-text" : ""}`} style={!connected ? { color: "rgba(255,255,255,0.3)" } : {}}>
            {connecting ? "Подключение..." : connected ? "Соединение установлено" : "Нажмите для подключения"}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Протокол", value: "Stealth / XTLS", icon: "Lock" },
          { label: "Шифрование", value: "AES-256-GCM", icon: "KeyRound" },
          { label: "DNS", value: "Зашифрован (DoH)", icon: "Server" },
          { label: "Маскировка", value: "HTTPS трафик", icon: "EyeOff" },
        ].map((item) => (
          <div key={item.label} className="glass-card neon-border rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name={item.icon} size={16} color="var(--neon-blue)" />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
            </div>
            <span className="text-sm font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {connected && (
        <div className="mt-6 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,229,255,0.08))", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Activity" size={16} color="var(--neon-green)" />
            <span className="text-sm font-bold" style={{ color: "var(--neon-green)" }}>Скорость</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>↓ Загрузка</div>
              <div className="font-black text-lg text-white">87 <span className="text-xs font-normal">Мбит/с</span></div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>↑ Отдача</div>
              <div className="font-black text-lg text-white">34 <span className="text-xs font-normal">Мбит/с</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}