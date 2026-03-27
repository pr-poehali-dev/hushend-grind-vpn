import Icon from "@/components/ui/icon";

const SERVERS_TOP = [
  { id: 1, country: "🇳🇱 Нидерланды", gb: 38 },
  { id: 2, country: "🇩🇪 Германия", gb: 24 },
  { id: 3, country: "🇺🇸 США", gb: 19 },
];

const STATS_WEEKLY = [65, 40, 85, 55, 90, 70, 45];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface OtherTabsProps {
  tab: "stats" | "settings" | "support";
  stealthMode: boolean;
  setStealthMode: (v: boolean) => void;
  autoConnect: boolean;
  setAutoConnect: (v: boolean) => void;
  killSwitch: boolean;
  setKillSwitch: (v: boolean) => void;
  protocol: string;
  setProtocol: (v: string) => void;
}

export default function OtherTabs({
  tab,
  stealthMode,
  setStealthMode,
  autoConnect,
  setAutoConnect,
  killSwitch,
  setKillSwitch,
  protocol,
  setProtocol,
}: OtherTabsProps) {
  return (
    <>
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
              {SERVERS_TOP.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="text-xs font-bold w-4" style={{ color: "rgba(255,255,255,0.3)" }}>{i + 1}</div>
                  <div className="text-lg">{s.country.split(" ")[0]}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{s.country.split(" ").slice(1).join(" ")}</div>
                  </div>
                  <div className="text-xs font-mono" style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.gb} ГБ
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
    </>
  );
}
