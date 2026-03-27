import Icon from "@/components/ui/icon";

type Tab = "home" | "connect" | "servers" | "stats" | "settings" | "support";

const SERVERS = [
  { id: 1, country: "🇳🇱 Нидерланды", city: "Амстердам", ping: 23, load: 42, premium: false },
  { id: 2, country: "🇩🇪 Германия", city: "Франкфурт", ping: 31, load: 67, premium: false },
  { id: 3, country: "🇺🇸 США", city: "Нью-Йорк", ping: 89, load: 55, premium: true },
  { id: 4, country: "🇯🇵 Япония", city: "Токио", ping: 145, load: 28, premium: true },
  { id: 5, country: "🇬🇧 Великобритания", city: "Лондон", ping: 44, load: 71, premium: false },
  { id: 6, country: "🇸🇬 Сингапур", city: "Сингапур", ping: 168, load: 33, premium: true },
  { id: 7, country: "🇫🇷 Франция", city: "Париж", ping: 37, load: 49, premium: false },
];

const STATS_WEEKLY = [65, 40, 85, 55, 90, 70, 45];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface Server {
  id: number;
  country: string;
  city: string;
  ping: number;
  load: number;
  premium: boolean;
}

interface TabContentProps {
  tab: Tab;
  connected: boolean;
  connecting: boolean;
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
  setTab: (tab: Tab) => void;
  stealthMode: boolean;
  setStealthMode: (v: boolean) => void;
  autoConnect: boolean;
  setAutoConnect: (v: boolean) => void;
  killSwitch: boolean;
  setKillSwitch: (v: boolean) => void;
  protocol: string;
  setProtocol: (v: string) => void;
  upTime: number;
  dataUsed: number;
  handleConnect: () => void;
  formatTime: (s: number) => string;
}

export default function TabContent({
  tab,
  connected,
  connecting,
  selectedServer,
  setSelectedServer,
  setTab,
  stealthMode,
  setStealthMode,
  autoConnect,
  setAutoConnect,
  killSwitch,
  setKillSwitch,
  protocol,
  setProtocol,
  upTime,
  dataUsed,
  handleConnect,
  formatTime,
}: TabContentProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5" style={{ scrollbarWidth: "none" }}>

      {/* HOME TAB */}
      {tab === "home" && (
        <div className="animate-fade-slide-up">
          <div className="flex flex-col items-center py-6">
            <div className="relative mb-6">
              {connected && (
                <>
                  <div className="absolute inset-0 rounded-full animate-pulse-ring2" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.15), transparent)" }} />
                  <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.2), transparent)" }} />
                </>
              )}
              {connecting && (
                <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "radial-gradient(circle, rgba(77,159,255,0.2), transparent)" }} />
              )}
              <button
                onClick={handleConnect}
                className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${connected ? "glow-button-connected" : "glow-button"}`}
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                {connecting ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white text-xs font-bold tracking-widest">ПОДКЛЮЧЕНИЕ</span>
                  </div>
                ) : (
                  <>
                    <Icon name={connected ? "ShieldCheck" : "Power"} size={36} color="white" />
                    <span className="text-white font-black text-sm tracking-widest mt-2">
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
      )}

      {/* CONNECT TAB */}
      {tab === "connect" && (
        <div className="animate-fade-slide-up py-4">
          <h2 className="text-xl font-black text-white mb-1">Подключение</h2>
          <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Скрытый режим обхода блокировок</p>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {connected && (
                <>
                  <div className="absolute inset-0 rounded-full animate-pulse-ring2" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.1), transparent)" }} />
                  <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.15), transparent)" }} />
                </>
              )}
              <button
                onClick={handleConnect}
                className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${connected ? "glow-button-connected" : "glow-button"}`}
              >
                {connecting ? (
                  <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Icon name={connected ? "ShieldCheck" : "Power"} size={32} color="white" />
                    <span className="text-white font-black text-xs tracking-wider mt-1">
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
      )}

      {/* SERVERS TAB */}
      {tab === "servers" && (
        <div className="animate-fade-slide-up py-4">
          <h2 className="text-xl font-black text-white mb-1">Серверы</h2>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{SERVERS.length} локаций доступно</p>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {["Все", "Быстрые", "Ближние", "Premium"].map((f) => (
              <button key={f} className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: f === "Все" ? "linear-gradient(135deg, #4D9FFF, #9B59FF)" : "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.08)" }}>
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {SERVERS.map((server) => (
              <div
                key={server.id}
                onClick={() => { setSelectedServer(server); setTab("home"); }}
                className={`server-item glass-card rounded-xl px-4 py-3 flex items-center gap-3 ${selectedServer.id === server.id ? "neon-border" : "border border-transparent"}`}
                style={selectedServer.id === server.id ? { borderColor: "rgba(0,229,255,0.3)" } : {}}
              >
                <div className="text-2xl">{server.country.split(" ")[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{server.country.split(" ").slice(1).join(" ")}</span>
                    {server.premium && (
                      <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(155,89,255,0.2)", color: "var(--neon-purple)" }}>PRO</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{server.city}</span>
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${server.load}%`, background: server.load > 70 ? "#FF6B6B" : server.load > 50 ? "var(--neon-blue)" : "var(--neon-green)" }} />
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{server.load}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold" style={{ color: server.ping < 50 ? "var(--neon-green)" : server.ping < 100 ? "var(--neon-blue)" : "#FF9F43", fontFamily: "'JetBrains Mono', monospace" }}>
                    {server.ping}мс
                  </div>
                </div>
                {selectedServer.id === server.id && (
                  <Icon name="CheckCircle" size={16} color="var(--neon-cyan)" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATS TAB */}
      {tab === "stats" && (
        <div className="animate-fade-slide-up py-4">
          <h2 className="text-xl font-black text-white mb-1">Статистика</h2>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>Активность за 7 дней</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Передано данных", value: "142.6 ГБ", icon: "Database", color: "var(--neon-blue)" },
              { label: "Время онлайн", value: "47ч 23м", icon: "Clock", color: "var(--neon-purple)" },
              { label: "Обходов блокировок", value: "1 284", icon: "ShieldCheck", color: "var(--neon-cyan)" },
              { label: "Серверов", value: "5", icon: "Globe", color: "var(--neon-green)" },
            ].map((s) => (
              <div key={s.label} className="glass-card neon-border rounded-2xl p-4">
                <Icon name={s.icon} size={22} color={s.color} />
                <div className="font-black text-xl text-white mt-2">{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-card neon-border rounded-2xl p-4 mb-4">
            <div className="text-sm font-bold text-white mb-4">Трафик по дням</div>
            <div className="flex items-end justify-between gap-2 h-24">
              {STATS_WEEKLY.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm transition-all duration-700" style={{ height: `${val}%`, background: i === 6 ? "linear-gradient(to top, #4D9FFF, #9B59FF)" : "rgba(77,159,255,0.3)" }} />
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{DAYS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card neon-border rounded-2xl p-4">
            <div className="text-sm font-bold text-white mb-3">Топ серверов</div>
            <div className="space-y-3">
              {SERVERS.slice(0, 3).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="text-xs font-bold w-4" style={{ color: "rgba(255,255,255,0.3)" }}>{i + 1}</div>
                  <div className="text-lg">{s.country.split(" ")[0]}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{s.country.split(" ").slice(1).join(" ")}</div>
                  </div>
                  <div className="text-xs font-mono" style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {[38, 24, 19][i]} ГБ
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {tab === "settings" && (
        <div className="animate-fade-slide-up py-4">
          <h2 className="text-xl font-black text-white mb-1">Настройки</h2>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>Конфигурация подключения</p>

          <div className="space-y-4">
            <div className="glass-card neon-border rounded-2xl p-4">
              <div className="text-sm font-bold text-white mb-3">Протокол</div>
              <div className="grid grid-cols-3 gap-2">
                {["Stealth", "VLESS", "WireGuard"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setProtocol(p)}
                    className="py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: protocol === p ? "linear-gradient(135deg, #4D9FFF, #9B59FF)" : "rgba(255,255,255,0.05)",
                      color: "white",
                      border: protocol === p ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)"
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card neon-border rounded-2xl overflow-hidden">
              {[
                { label: "Скрытый режим", desc: "Маскировка под HTTPS", value: stealthMode, onChange: setStealthMode, icon: "EyeOff", color: "var(--neon-purple)" },
                { label: "Автоподключение", desc: "При запуске приложения", value: autoConnect, onChange: setAutoConnect, icon: "Zap", color: "var(--neon-blue)" },
                { label: "Kill Switch", desc: "Блок трафика при разрыве", value: killSwitch, onChange: setKillSwitch, icon: "ShieldAlert", color: "var(--neon-cyan)" },
              ].map((s, i) => (
                <div key={s.label} className={`flex items-center gap-3 px-4 py-4 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18` }}>
                    <Icon name={s.icon} size={18} color={s.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{s.label}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.desc}</div>
                  </div>
                  <button
                    onClick={() => s.onChange(!s.value)}
                    className="w-12 h-6 rounded-full relative transition-all duration-300"
                    style={{ background: s.value ? "linear-gradient(135deg, #4D9FFF, #9B59FF)" : "rgba(255,255,255,0.1)" }}
                  >
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: s.value ? "calc(100% - 22px)" : "2px" }} />
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-card neon-border rounded-2xl p-4">
              <div className="text-sm font-bold text-white mb-3">DNS сервер</div>
              <div className="space-y-2">
                {["Авто (HGV DNS)", "Cloudflare (1.1.1.1)", "Google (8.8.8.8)"].map((d, i) => (
                  <button key={d} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left" style={{ background: i === 0 ? "rgba(77,159,255,0.1)" : "transparent", border: i === 0 ? "1px solid rgba(77,159,255,0.25)" : "1px solid transparent", color: i === 0 ? "var(--neon-blue)" : "rgba(255,255,255,0.5)" }}>
                    {i === 0 ? <Icon name="CheckCircle" size={14} color="var(--neon-blue)" /> : <div className="w-3.5 h-3.5 rounded-full border flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.2)" }} />}
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT TAB */}
      {tab === "support" && (
        <div className="animate-fade-slide-up py-4">
          <h2 className="text-xl font-black text-white mb-1">Поддержка</h2>
          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>Мы всегда на связи</p>

          <div className="space-y-3 mb-5">
            {[
              { icon: "MessageCircle", title: "Live чат", desc: "Ответ в течение 2 минут", color: "var(--neon-blue)", badge: "Онлайн" },
              { icon: "Mail", title: "Email поддержка", desc: "support@hushendgrind.vpn", color: "var(--neon-purple)", badge: null },
              { icon: "BookOpen", title: "База знаний", desc: "Руководства и FAQ", color: "var(--neon-cyan)", badge: null },
            ].map((s) => (
              <div key={s.title} className="glass-card neon-border rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer server-item">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18` }}>
                  <Icon name={s.icon} size={22} color={s.color} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    {s.title}
                    {s.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(0,255,136,0.15)", color: "var(--neon-green)" }}>{s.badge}</span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
                </div>
                <Icon name="ChevronRight" size={16} color="rgba(255,255,255,0.25)" />
              </div>
            ))}
          </div>

          <div className="glass-card neon-border rounded-2xl p-4">
            <div className="text-sm font-bold text-white mb-3">Частые вопросы</div>
            <div className="space-y-3">
              {[
                "Как работает скрытый режим?",
                "Замедляет ли VPN интернет?",
                "Сколько устройств можно подключить?",
                "Логирует ли сервис мой трафик?",
              ].map((q) => (
                <button key={q} className="w-full text-left flex items-center justify-between py-2 text-sm" style={{ color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {q}
                  <Icon name="ChevronRight" size={14} color="rgba(255,255,255,0.2)" />
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 pb-4">
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace" }}>
              HushendGrindVPN v2.4.1 · Build 2026.03
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
