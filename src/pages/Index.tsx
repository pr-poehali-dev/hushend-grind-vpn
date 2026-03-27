import { useState, useEffect } from "react";
import AppHeader from "@/components/vpn/AppHeader";
import BottomNav from "@/components/vpn/BottomNav";
import TabContent from "@/components/vpn/TabContent";

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

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
  const [stealthMode, setStealthMode] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [protocol, setProtocol] = useState("Stealth");
  const [upTime, setUpTime] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (connected) {
      interval = setInterval(() => {
        setUpTime((t) => t + 1);
        setDataUsed((d) => d + Math.random() * 0.05);
      }, 1000);
    } else {
      setUpTime(0);
    }
    return () => clearInterval(interval);
  }, [connected]);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2200);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-0 sm:p-8" style={{ background: "var(--dark-bg)" }}>
      <div className="phone-frame overflow-hidden flex flex-col" style={{ background: "var(--dark-bg)", fontFamily: "'Exo 2', sans-serif" }}>

        <AppHeader connected={connected} />

        <TabContent
          tab={tab}
          connected={connected}
          connecting={connecting}
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          setTab={setTab}
          stealthMode={stealthMode}
          setStealthMode={setStealthMode}
          autoConnect={autoConnect}
          setAutoConnect={setAutoConnect}
          killSwitch={killSwitch}
          setKillSwitch={setKillSwitch}
          protocol={protocol}
          setProtocol={setProtocol}
          upTime={upTime}
          dataUsed={dataUsed}
          handleConnect={handleConnect}
          formatTime={formatTime}
        />

        <BottomNav tab={tab} setTab={setTab} />

      </div>
    </div>
  );
}
