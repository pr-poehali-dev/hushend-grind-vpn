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
        <div className="relative" style={{ width: 128, height: 128 }}>
          {connecting && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="orbit-tail1c absolute w-1.5 h-1.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail1b absolute w-2 h-2 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail1a absolute w-2.5 h-2.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-dot1 absolute w-3 h-3 rounded-full" style={{ background: "#00E5FF", boxShadow: "0 0 8px #00E5FF, 0 0 16px rgba(0,229,255,0.6)" }} />
              <div className="orbit-tail2c absolute w-1.5 h-1.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail2b absolute w-2 h-2 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-tail2a absolute w-2.5 h-2.5 rounded-full" style={{ background: "#00C8FF" }} />
              <div className="orbit-dot2 absolute w-3 h-3 rounded-full" style={{ background: "#00E5FF", boxShadow: "0 0 8px #00E5FF, 0 0 16px rgba(0,229,255,0.6)" }} />
            </div>
          )}
          {connected && (
            <>
              <div className="absolute inset-0 rounded-full animate-pulse-ring2" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.18), transparent)" }} />
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.28), transparent)" }} />
            </>
          )}
          <button
            onClick={handleConnect}
            className={`relative w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-500 ${connected ? "glow-button-cyan" : "glow-button-idle"}`}
          >
            {connecting ? (
              <span className="text-xs font-bold tracking-widest" style={{ color: "rgba(0,229,255,0.8)" }}>...</span>
            ) : (
              <>
                <Icon name={connected ? "ShieldCheck" : "Power"} size={30} color={connected ? "white" : "rgba(0,200,255,0.7)"} />
                <span className="font-black text-xs tracking-wider mt-1" style={{ color: connected ? "white" : "rgba(0,200,255,0.65)" }}>
                  {connected ? "ОТКЛЮЧИТЬ" : "СТАРТ"}
                </span>
              </>
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
