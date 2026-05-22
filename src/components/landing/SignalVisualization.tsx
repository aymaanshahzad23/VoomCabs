export function SignalVisualization() {
  return (
    <div className="surface-card grid-bg relative overflow-hidden p-4 sm:p-6">
      <svg viewBox="0 0 480 380" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="trackA" d="M16 92 C84 62, 140 120, 214 102 C292 84, 350 52, 462 80" />
          <path
            id="trackB"
            d="M18 212 C104 172, 168 168, 246 206 C314 242, 370 268, 460 248"
          />
          <path id="trackC" d="M24 324 C98 282, 162 284, 244 308 C316 332, 380 314, 462 332" />
        </defs>

        <path
          d="M16 92 C84 62, 140 120, 214 102 C292 84, 350 52, 462 80"
          fill="none"
          className="path-draw"
          stroke="rgb(245 166 35 / 90%)"
          strokeWidth="2.2"
          style={{ animationDelay: "120ms" }}
          strokeLinecap="square"
        />
        <path
          d="M18 212 C104 172, 168 168, 246 206 C314 242, 370 268, 460 248"
          fill="none"
          className="path-draw"
          stroke="rgb(240 237 232 / 64%)"
          strokeWidth="2"
          style={{ animationDelay: "220ms" }}
          strokeLinecap="square"
        />
        <path
          d="M24 324 C98 282, 162 284, 244 308 C316 332, 380 314, 462 332"
          fill="none"
          className="path-draw"
          stroke="rgb(122 122 122 / 60%)"
          strokeWidth="1.8"
          style={{ animationDelay: "320ms" }}
          strokeLinecap="square"
        />

        <circle r="5" fill="#F5A623">
          <animateMotion dur="4.2s" repeatCount="indefinite">
            <mpath href="#trackA" />
          </animateMotion>
        </circle>
        <circle r="4.5" fill="#F0EDE8">
          <animateMotion dur="5.1s" repeatCount="indefinite">
            <mpath href="#trackB" />
          </animateMotion>
        </circle>
        <circle r="4.5" fill="#7A7A7A">
          <animateMotion dur="6.3s" repeatCount="indefinite">
            <mpath href="#trackC" />
          </animateMotion>
        </circle>
      </svg>

      <div className="surface-card absolute left-4 top-4 px-3 py-2 text-[11px]">
        <p className="text-[#F5A623]">FARE DELTA ENGINE</p>
        <p className="text-[#7A7A7A]">Weighted in real time</p>
      </div>
      <div className="surface-card absolute bottom-4 right-4 px-3 py-2 text-[11px]">
        <p className="text-[#F5A623]">CONFIDENCE</p>
        <p className="text-[#7A7A7A]">85% route certainty</p>
      </div>
    </div>
  );
}
