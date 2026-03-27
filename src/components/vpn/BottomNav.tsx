import Icon from "@/components/ui/icon";

type Tab = "home" | "connect" | "servers" | "stats" | "settings" | "support";

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "connect", icon: "Zap", label: "Связь" },
  { id: "servers", icon: "Globe", label: "Серверы" },
  { id: "stats", icon: "BarChart2", label: "Статистика" },
  { id: "settings", icon: "Settings", label: "Настройки" },
  { id: "support", icon: "Headphones", label: "Помощь" },
];

interface BottomNavProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

export default function BottomNav({ tab, setTab }: BottomNavProps) {
  return (
    <>
      <div className="glass-card px-2 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="nav-item flex flex-col items-center gap-1 px-1 py-1 rounded-xl transition-all"
              style={{ minWidth: 44 }}
            >
              <div className="relative">
                <Icon
                  name={item.icon}
                  size={20}
                  color={tab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.3)"}
                />
                {tab === item.id && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "var(--neon-cyan)" }} />
                )}
              </div>
              <span style={{ color: tab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: tab === item.id ? 700 : 400 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-2 pt-1">
        <div className="w-28 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>
    </>
  );
}
