import Icon from "@/components/ui/icon";

interface AppHeaderProps {
  connected: boolean;
}

export default function AppHeader({ connected }: AppHeaderProps) {
  return (
    <>
      {/* Status Bar */}
      <div
        className="flex justify-between items-center px-6 pt-4 pb-2 text-xs"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span style={{ letterSpacing: "0.06em" }}>9:41</span>
        <div className="flex gap-1.5 items-center" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Icon name="Signal" size={12} />
          <Icon name="Wifi" size={12} />
          <Icon name="Battery" size={12} />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-2.5">
        <div>
          <div
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(0,210,255,0.55)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.22em" }}
          >
            HUSHEND
          </div>
          <div className="text-xl font-black tracking-wide gradient-text leading-tight">
            GrindVPN
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {connected && (
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,255,136,0.09)",
                color: "var(--neon-green)",
                border: "1px solid rgba(0,255,136,0.22)",
                letterSpacing: "0.06em",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--neon-green)", boxShadow: "0 0 5px var(--neon-green)" }} />
              PROTECTED
            </div>
          )}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Icon name="User" size={14} color="rgba(255,255,255,0.45)" />
          </div>
        </div>
      </div>
    </>
  );
}