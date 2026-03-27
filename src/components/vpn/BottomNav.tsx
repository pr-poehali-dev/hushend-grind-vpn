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
      <div
        className="px-2 py-2.5 border-t"
        style={{
          borderColor: "rgba(0,180,255,0.08)",
          background: "rgba(6,10,18,0.92)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="nav-item flex flex-col items-center gap-1 px-1 py-1 rounded-xl transition-all"
              style={{ minWidth: 44 }}
            >
              <div className="relative flex items-center justify-center">
                {tab === item.id && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 32, height: 32,
                      background: "rgba(0,200,255,0.1)",
                      boxShadow: "0 0 12px rgba(0,190,255,0.2)",
                    }}
                  />
                )}
                <Icon
                  name={item.icon}
                  size={19}
                  color={tab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.28)"}
                />
              </div>
              <span style={{
                color: tab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.28)",
                fontSize: "9px",
                fontWeight: tab === item.id ? 700 : 400,
                letterSpacing: tab === item.id ? "0.04em" : "0",
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-2 pt-1.5">
        <div className="w-24 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>
    </>
  );
}