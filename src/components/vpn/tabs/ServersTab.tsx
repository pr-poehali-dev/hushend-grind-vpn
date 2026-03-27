import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVERS = [
  { id: 1, country: "🇳🇱 Нидерланды", city: "Амстердам", ping: 23, load: 42, premium: false },
  { id: 2, country: "🇩🇪 Германия", city: "Франкфурт", ping: 31, load: 67, premium: false },
  { id: 3, country: "🇺🇸 США", city: "Нью-Йорк", ping: 89, load: 55, premium: true },
  { id: 4, country: "🇯🇵 Япония", city: "Токио", ping: 145, load: 28, premium: true },
  { id: 5, country: "🇬🇧 Великобритания", city: "Лондон", ping: 44, load: 71, premium: false },
  { id: 6, country: "🇸🇬 Сингапур", city: "Сингапур", ping: 168, load: 33, premium: true },
  { id: 7, country: "🇫🇷 Франция", city: "Париж", ping: 37, load: 49, premium: false },
];

interface Server {
  id: number;
  country: string;
  city: string;
  ping: number;
  load: number;
  premium: boolean;
}

interface ServersTabProps {
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
  setTab: (tab: "home" | "connect" | "servers" | "stats" | "settings" | "support") => void;
}

export default function ServersTab({ selectedServer, setSelectedServer, setTab }: ServersTabProps) {
  const [serverFilter, setServerFilter] = useState("Все");

  const filteredServers = SERVERS.filter((s) => {
    if (serverFilter === "Быстрые") return s.ping < 50;
    if (serverFilter === "Ближние") return s.ping < 60;
    if (serverFilter === "Premium") return s.premium;
    return true;
  });

  return (
    <div className="animate-fade-slide-up py-4">
      <h2 className="text-xl font-black text-white mb-1">Серверы</h2>
      <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{SERVERS.length} локаций доступно</p>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {["Все", "Быстрые", "Ближние", "Premium"].map((f) => (
          <button
            key={f}
            onClick={() => setServerFilter(f)}
            className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: serverFilter === f ? "linear-gradient(135deg, #4D9FFF, #9B59FF)" : "rgba(255,255,255,0.06)",
              color: "white",
              border: serverFilter === f ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
              transform: serverFilter === f ? "scale(1.05)" : "scale(1)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.3)" }}>
          <Icon name="ServerOff" size={32} color="rgba(255,255,255,0.15)" />
          <div className="text-sm mt-3">Нет серверов в этой категории</div>
        </div>
      )}

      <div className="space-y-2">
        {filteredServers.map((server) => (
          <div
            key={server.id}
            onClick={() => { setSelectedServer(server); setTab("home"); }}
            role="button"
            tabIndex={0}
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
  );
}
