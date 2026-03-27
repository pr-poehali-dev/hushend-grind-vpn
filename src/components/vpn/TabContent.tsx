import HomeTab from "@/components/vpn/tabs/HomeTab";
import ConnectTab from "@/components/vpn/tabs/ConnectTab";
import ServersTab from "@/components/vpn/tabs/ServersTab";
import OtherTabs from "@/components/vpn/tabs/OtherTabs";

type Tab = "home" | "connect" | "servers" | "stats" | "settings" | "support";

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

      {tab === "home" && (
        <HomeTab
          connected={connected}
          connecting={connecting}
          selectedServer={selectedServer}
          protocol={protocol}
          dataUsed={dataUsed}
          upTime={upTime}
          handleConnect={handleConnect}
          formatTime={formatTime}
        />
      )}

      {tab === "connect" && (
        <ConnectTab
          connected={connected}
          connecting={connecting}
          handleConnect={handleConnect}
        />
      )}

      {tab === "servers" && (
        <ServersTab
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          setTab={setTab}
        />
      )}

      {(tab === "stats" || tab === "settings" || tab === "support") && (
        <OtherTabs
          tab={tab}
          stealthMode={stealthMode}
          setStealthMode={setStealthMode}
          autoConnect={autoConnect}
          setAutoConnect={setAutoConnect}
          killSwitch={killSwitch}
          setKillSwitch={setKillSwitch}
          protocol={protocol}
          setProtocol={setProtocol}
        />
      )}

    </div>
  );
}
