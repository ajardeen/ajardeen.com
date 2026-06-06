import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { ShieldCheck } from "lucide-react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import BigText from "@/components/big-text";

function SecurityBanner() {
  const securityWords = [
    "SECURE",
    "VETTING",
    "ENCRYPT",
    "AUDITED",
    "FORTIFY",
    "TRUST",
  ];

  return (
    <Panel id="security">
      <PanelHeader>
        <PanelTitle>Why Security Matters?</PanelTitle>
      </PanelHeader>
      
      {/* Original Synchronized CSS Pipeline Loops */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        
        @keyframes packetIn {
          0% {
            transform: translateX(-20px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(50vw - 160px));
            opacity: 0;
          }
        }

        @keyframes packetOut {
          0% {
            transform: translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(50vw - 160px));
            opacity: 0;
          }
        }

        .animate-path-line {
          animation: dash 1.5s linear infinite;
        }

        .animate-packet-in {
          animation: packetIn 4s linear infinite ;
        }

        .animate-packet-out {
          animation: packetOut 4s linear infinite;
          animation-delay: 2s; 
        }
      `,
        }}
      />
      
      <PanelContent className="relative bg-background select-none overflow-hidden p-0 py-4">
        {/* Premium Radial Background Glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none rounded-full blur-[120px] opacity-15 bg-gradient-to-r from-primary via-emerald-500 to-cyan-500"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-8">
          {/* Top Track: Dynamic Security Vocabulary */}
          <div className="relative w-full">
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={40}>
                {securityWords.map((word, i) => (
                  <MarqueeItem
                    key={`top-${i}-${word}`}
                    className="flex items-center gap-16 pr-16"
                  >
                    <div className="flex items-center gap-4">
                      <span className="block h-8 w-2 rotate-12 rounded bg-muted-foreground/20" />
                      <BigText
                        text={word}
                        className="tracking-tighter uppercase opacity-75"
                      />
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>

          {/* Middle Intercept Loop Pipeline */}
          <div className="relative w-full flex items-center justify-center my-4 h-12">
            {/* Animated Foreground SVG Circuit Track */}
            <div className="absolute inset-0 flex items-center w-full h-full px-4">
              <svg className="w-full h-[2px]" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  className="stroke-border/20"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  className="stroke-primary/60 animate-path-line"
                  strokeWidth="1.5"
                  strokeDasharray="6, 14"
                />
              </svg>
            </div>

            {/* LEFT INNER TRACK: Traveling Input Packet */}
            <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 hidden lg:flex justify-start pl-4 pointer-events-none overflow-hidden h-10 items-center">
              <div className="animate-packet-in flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-amber-500/20 shadow-sm rounded-full px-2.5 py-1 font-mono text-[10px] text-amber-500/90 whitespace-nowrap">
                <span className="opacity-50">USER :</span>
                <span>password:1234</span>
              </div>
            </div>

            {/* CENTER: Processing Core Shield Badge */}
            <div className="relative z-20 flex items-center gap-2.5 bg-background border border-border/80 shadow-md rounded-full px-5 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <ShieldCheck size={14} className="text-primary" />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Security foundation
              </span>
            </div>

            {/* RIGHT INNER TRACK: Traveling Hashed Output Packet */}
            <div className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 hidden lg:flex justify-start pointer-events-none overflow-hidden h-10 items-center">
              <div className="animate-packet-out flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-emerald-500/20 shadow-sm rounded-full px-2.5 py-1 font-mono text-[10px] text-emerald-400/90 whitespace-nowrap">
                <span className="opacity-50">HASH:</span>
                <span>03ac6742...d7c846f4</span>
              </div>
            </div>
          </div>

          {/* Bottom Track: Technical Subtext with Dynamic Threat Casing & High Contrast Danger Signaling */}
          <div className="relative w-full">
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent speed={20} direction="right" >
                {[...Array(3)].map((_, i) => (
                  <MarqueeItem
                    key={`bottom-${i}`}
                    className="flex items-center gap-12 pr-12 text-xs md:text-sm font-mono tracking-widest text-muted-foreground/70 uppercase whitespace-nowrap"
                  >
                    <span>Built secure by default</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span>Protects critical assets</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span className="text-destructive font-semibold">Prevents devastating financial losses</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span>Safeguards personal privacy</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span className="text-destructive font-semibold">Defends against identity theft</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span className="text-destructive font-semibold">Mitigates ransomware threats</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span>Zero Trust Architecture</span>
                    <span className="text-muted-foreground/30">•</span>
                    
                    <span className="text-destructive font-semibold">Stops operational disruptions</span>
                    <span className="text-muted-foreground/30">•</span>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}

export default SecurityBanner;