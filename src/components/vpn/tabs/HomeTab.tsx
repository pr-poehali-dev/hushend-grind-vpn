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

/* SVG-кольцо с двумя кометами — плавные дуги с угасающим хвостом */
function OrbitRing({ size, reverse = false }: { size: number; reverse?: boolean }) {
  const r = size / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={reverse ? "orbit-svg-2" : "orbit-svg-1"}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        {/* Хвост кометы 1 */}
        <linearGradient id={`comet${reverse ? "B" : "A"}`} gradientUnits="userSpaceOnUse"
          x1={cx + r} y1={cy} x2={cx} y2={cy - r}>
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="40%" stopColor="#00C8FF" stopOpacity="0.18" />
          <stop offset="75%" stopColor="#00DAFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
        </linearGradient>
        <filter id={`blur${reverse ? "B" : "A"}`}>
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Очень тонкое базовое кольцо */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(0,200,255,0.07)"
        strokeWidth="1"
      />

      {/* Хвост — дуга ~130° с градиентом и blur */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={`url(#comet${reverse ? "B" : "A"})`}
        strokeWidth="2.5"
        strokeDasharray={`${circ * 0.36} ${circ * 0.64}`}
        strokeLinecap="round"
        filter={`url(#blur${reverse ? "B" : "A"})`}
        opacity="0.9"
      />

      {/* Голова кометы — яркая точка */}
      <circle
        cx={cx + r} cy={cy} r={4}
        fill="#00E8FF"
        filter={`url(#blur${reverse ? "B" : "A"})`}
        opacity="0.95"
      />
      {/* Блик поверх */}
      <circle
        cx={cx + r} cy={cy} r={2.2}
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
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
  const btnSize = 148;

  return (
    <div className="animate-fade-slide-up">
      <div className="flex flex-col items-center py-6">

        {/* Внешнее атмосферное свечение под кнопкой */}
        <div className="relative flex items-center justify-center mb-8" style={{ width: btnSize + 80, height: btnSize + 80 }}>

          {/* Ambient glow — большой мягкий ореол */}
          <div
            className="absolute rounded-full animate-ambient"
            style={{
              width: btnSize + 72,
              height: btnSize + 72,
              background: connecting
                ? "radial-gradient(circle, rgba(0,200,255,0.16) 0%, rgba(0,160,255,0.07) 45%, transparent 70%)"
                : connected
                  ? "radial-gradient(circle, rgba(0,210,255,0.22) 0%, rgba(0,160,255,0.1) 45%, transparent 70%)"
                  : "radial-gradient(circle, rgba(0,180,255,0.1) 0%, rgba(0,140,255,0.04) 50%, transparent 72%)",
            }}
          />

          {/* SVG орбиты при подключении */}
          {connecting && (
            <>
              <OrbitRing size={btnSize + 32} />
              <OrbitRing size={btnSize + 32} reverse />
            </>
          )}

          {/* Пульс-кольца при подключённом состоянии */}
          {connected && (
            <>
              <div
                className="absolute rounded-full animate-pulse-ring"
                style={{
                  width: btnSize + 20,
                  height: btnSize + 20,
                  border: "1px solid rgba(0,210,255,0.35)",
                }}
              />
              <div
                className="absolute rounded-full animate-pulse-ring2"
                style={{
                  width: btnSize + 20,
                  height: btnSize + 20,
                  border: "1px solid rgba(0,180,255,0.2)",
                }}
              />
            </>
          )}

          {/* Тонкое статичное кольцо всегда */}
          {!connecting && (
            <div
              className="absolute rounded-full"
              style={{
                width: btnSize + 16,
                height: btnSize + 16,
                border: "1px solid rgba(0,190,255,0.1)",
              }}
            />
          )}

          {/* Кнопка */}
          <button
            onClick={handleConnect}
            className={`relative rounded-full flex flex-col items-center justify-center transition-all duration-600 ${
              connected ? "glow-button-cyan" : "glow-button-idle"
            }`}
            style={{ width: btnSize, height: btnSize, fontFamily: "'Exo 2', sans-serif" }}
          >
            {/* Внутреннее свечение */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: connected
                  ? "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18) 0%, transparent 60%)"
                  : "radial-gradient(circle at 40% 35%, rgba(0,220,255,0.08) 0%, transparent 60%)",
              }}
            />

            {connecting ? (
              <span
                className="relative text-xs font-bold tracking-widest"
                style={{ color: "rgba(0,229,255,0.9)", letterSpacing: "0.2em" }}
              >
                ПОДКЛЮЧЕНИЕ
              </span>
            ) : (
              <div className="relative flex flex-col items-center gap-1.5">
                <Icon
                  name={connected ? "ShieldCheck" : "Power"}
                  size={36}
                  color={connected ? "rgba(255,255,255,0.95)" : "rgba(0,210,255,0.72)"}
                />
                <span
                  className="font-black text-sm tracking-widest"
                  style={{ color: connected ? "rgba(255,255,255,0.92)" : "rgba(0,200,255,0.62)" }}
                >
                  {connected ? "ОТКЛЮЧИТЬ" : "ПОДКЛЮЧИТЬ"}
                </span>
              </div>
            )}
          </button>
        </div>

        {connected && (
          <div className="text-center animate-fade-slide-up -mt-2 mb-2">
            <div
              className="text-2xl font-black tabular-nums"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--neon-cyan)", letterSpacing: "0.04em" }}
            >
              {formatTime(upTime)}
            </div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Время подключения</div>
          </div>
        )}
      </div>

      {/* Карточка текущего сервера */}
      <div className="glass-card neon-border rounded-2xl p-4 mb-3" style={{ background: "rgba(8,13,26,0.7)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "rgba(0,160,255,0.1)", border: "1px solid rgba(0,180,255,0.12)" }}
            >
              {selectedServer.country.split(" ")[0]}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{selectedServer.country.split(" ").slice(1).join(" ")}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{selectedServer.city}</div>
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-sm font-black"
              style={{ color: selectedServer.ping < 50 ? "var(--neon-green)" : selectedServer.ping < 100 ? "var(--neon-blue)" : "#FF6B6B", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {selectedServer.ping}<span className="text-xs font-normal ml-0.5" style={{ opacity: 0.7 }}>мс</span>
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>пинг</div>
          </div>
        </div>
      </div>

      {/* Мини-статы */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        {[
          { label: "Режим", value: "Stealth", icon: "EyeOff", color: "var(--neon-purple)" },
          { label: "Протокол", value: protocol, icon: "Lock", color: "var(--neon-blue)" },
          { label: "Данные", value: `${dataUsed.toFixed(1)} ГБ`, icon: "Activity", color: "var(--neon-cyan)" },
        ].map((s) => (
          <div
            key={s.label}
            className="glass-card rounded-xl p-3 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.045)", background: "rgba(8,13,26,0.65)" }}
          >
            <Icon name={s.icon} size={17} color={s.color} />
            <div className="font-bold text-xs mt-1.5 text-white">{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Stealth-баннер */}
      <div
        className="rounded-2xl p-4 mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(130,60,255,0.1) 0%, rgba(0,140,255,0.07) 100%)",
          border: "1px solid rgba(130,80,255,0.18)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(130,60,255,0.15)", border: "1px solid rgba(130,80,255,0.2)" }}
          >
            <Icon name="EyeOff" size={18} color="var(--neon-purple)" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-white">Скрытый режим активен</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Трафик маскируется под HTTPS</div>
          </div>
          <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: "var(--neon-green)", boxShadow: "0 0 6px var(--neon-green)" }} />
        </div>
      </div>

      {/* IP-статус */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{
          background: "rgba(0,200,255,0.04)",
          border: "1px solid rgba(0,200,255,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <Icon name="Shield" size={20} color="rgba(0,210,255,0.65)" />
          <div className="flex-1 min-w-0">
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Ваш IP скрыт</div>
            <div
              className="font-bold text-sm mt-0.5 truncate"
              style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace", opacity: connected ? 1 : 0.5 }}
            >
              {connected ? "185.220.101.XX" : "— — . — — . — — . — —"}
            </div>
          </div>
          <div
            className="text-xs px-2.5 py-1 rounded-lg font-bold flex-shrink-0"
            style={{
              background: connected ? "rgba(0,255,136,0.12)" : "rgba(255,80,80,0.1)",
              color: connected ? "var(--neon-green)" : "#FF6666",
              border: connected ? "1px solid rgba(0,255,136,0.2)" : "1px solid rgba(255,80,80,0.18)",
            }}
          >
            {connected ? "ЗАЩИЩЁН" : "ОТКРЫТ"}
          </div>
        </div>
      </div>
    </div>
  );
}
