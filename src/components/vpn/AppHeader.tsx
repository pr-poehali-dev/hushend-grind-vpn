import Icon from "@/components/ui/icon";

interface AppHeaderProps {
  connected: boolean;
}

export default function AppHeader({ connected }: AppHeaderProps) {
  return (
    <>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <Icon name="Signal" size={12} />
          <Icon name="Wifi" size={12} />
          <Icon name="Battery" size={12} />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <div className="text-xs tracking-widest uppercase" style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}>
            HUSHEND
          </div>
          <div className="text-lg font-black tracking-wide gradient-text">
            GrindVPN
          </div>
        </div>
        <div className="flex items-center gap-2">
          {connected && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,255,136,0.12)", color: "var(--neon-green)", border: "1px solid rgba(0,255,136,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--neon-green)" }} />
              PROTECTED
            </div>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon name="User" size={14} color="rgba(255,255,255,0.6)" />
          </div>
        </div>
      </div>
    </>
  );
}
