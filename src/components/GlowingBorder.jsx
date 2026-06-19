import { useEffect, useRef } from "react";

function parseColor(color) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = color;
  const resolved = ctx.fillStyle;

  if (resolved.startsWith("#")) {
    const h = resolved.slice(1);
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1,
    };
  }

  const [r, g, b, a = 1] = resolved.match(/[\d.]+/g).map(Number);
  return { r, g, b, a };
}

function lerpRgb(a, b, t) {
  return {
    r: (a.r + (b.r - a.r) * t) | 0,
    g: (a.g + (b.g - a.g) * t) | 0,
    b: (a.b + (b.b - a.b) * t) | 0,
    a:  a.a + (b.a - a.a) * t,
  };
}

function calcPerimeter(W, H, r) {
  r = Math.min(r, W / 2, H / 2);
  return 2 * (W - 2 * r) + 2 * (H - 2 * r) + 2 * Math.PI * r;
}

function perimeterPoint(W, H, r, t, dist) {
  r = Math.min(r, W / 2, H / 2);
  const o = t / 2;
  const x0 = o, y0 = o, x1 = W - o, y1 = H - o;
  const arc = (Math.PI / 2) * r;

  const segs = [
    { len: x1-x0-2*r, pt: f => ({ x: x0+r + f*(x1-x0-2*r),                        y: y0                                          }) },
    { len: arc,        pt: f => ({ x: x1-r + r*Math.cos(-Math.PI/2 + f*Math.PI/2), y: y0+r + r*Math.sin(-Math.PI/2 + f*Math.PI/2) }) },
    { len: y1-y0-2*r, pt: f => ({ x: x1,                                            y: y0+r + f*(y1-y0-2*r)                        }) },
    { len: arc,        pt: f => ({ x: x1-r + r*Math.cos(f*Math.PI/2),               y: y1-r + r*Math.sin(f*Math.PI/2)              }) },
    { len: x1-x0-2*r, pt: f => ({ x: x1-r - f*(x1-x0-2*r),                         y: y1                                          }) },
    { len: arc,        pt: f => ({ x: x0+r + r*Math.cos(Math.PI/2 + f*Math.PI/2),   y: y1-r + r*Math.sin(Math.PI/2 + f*Math.PI/2) }) },
    { len: y1-y0-2*r, pt: f => ({ x: x0,                                            y: y1-r - f*(y1-y0-2*r)                        }) },
    { len: arc,        pt: f => ({ x: x0+r + r*Math.cos(Math.PI + f*Math.PI/2),     y: y0+r + r*Math.sin(Math.PI + f*Math.PI/2)    }) },
  ];

  const total = segs.reduce((s, sg) => s + sg.len, 0);
  let rem = ((dist % total) + total) % total;

  for (const seg of segs) {
    if (rem <= seg.len + 1e-9) return seg.pt(seg.len > 0 ? rem / seg.len : 0);
    rem -= seg.len;
  }
  return segs[0].pt(0);
}

export default function GlowBorder({
  radius    = 12,
  thickness = 2,
  speed     = 4,
  streak    = 0.25,
  base      = "#2a2a36",
  c1        = "#818cf8",
  c2        = "#c084fc",
  hoverOnly = false, // jeśli true — pasek pojawia się tylko na hover
  fadeSpeed = 4,     // jak szybko fade in/out (wyżej = szybciej)
  className = "",
  children,
}) {
  const wrapRef         = useRef(null);
  const canvasRef       = useRef(null);
  const hoverTargetRef  = useRef(hoverOnly ? 0 : 1); // docelowa opacity
  const hoverOpacityRef = useRef(hoverOnly ? 0 : 1); // bieżąca (płynna) opacity

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const c1RGB = parseColor(c1);
    const c2RGB = parseColor(c2);

    const onEnter = () => { hoverTargetRef.current = 1; };
    const onLeave = () => { hoverTargetRef.current = hoverOnly ? 0 : 1; };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    let W = 0, H = 0, perimeter = 1;
    let progress = 0, lastTime = null, raf;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      if (!W || !H) return;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      perimeter = calcPerimeter(W, H, radius);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const t = thickness;
      const r = Math.min(radius, W / 2, H / 2);
      const streakLen = perimeter * streak;
      const ho = hoverOpacityRef.current;

      // base border
      ctx.beginPath();
      ctx.moveTo(r + t/2,     t/2);
      ctx.lineTo(W - r - t/2, t/2);
      ctx.arcTo (W-t/2, t/2,   W-t/2,   r+t/2,   r);
      ctx.lineTo(W-t/2,        H - r - t/2);
      ctx.arcTo (W-t/2, H-t/2, W-r-t/2, H-t/2,   r);
      ctx.lineTo(r+t/2,        H-t/2);
      ctx.arcTo (t/2,   H-t/2, t/2,     H-r-t/2, r);
      ctx.lineTo(t/2,          r+t/2);
      ctx.arcTo (t/2,   t/2,   r+t/2,   t/2,     r);
      ctx.closePath();
      ctx.strokeStyle = base;
      ctx.lineWidth   = t;
      ctx.lineCap     = "butt";
      ctx.stroke();

      // gradient streak — skalowany przez ho (hover opacity)
      if (ho > 0.001) {
        const SEGMENTS = 80;
        for (let i = 0; i < SEGMENTS; i++) {
          const frac  = i / (SEGMENTS - 1);
          const p0    = perimeterPoint(W, H, r, t, (progress + (i       / SEGMENTS) * streakLen) % perimeter);
          const p1    = perimeterPoint(W, H, r, t, (progress + ((i + 1) / SEGMENTS) * streakLen) % perimeter);
          const rgb   = lerpRgb(c1RGB, c2RGB, frac);
          const alpha = rgb.a * Math.sin(frac * Math.PI) * ho;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha.toFixed(3)})`;
          ctx.lineWidth   = t;
          ctx.lineCap     = "round";
          ctx.stroke();
        }
      }
    }

    function frame(time) {
      if (lastTime !== null) {
        const dt = Math.min((time - lastTime) / 1000, 0.1);
        progress = (progress + dt * (perimeter / speed)) % perimeter;

        // płynny fade w stronę targetu
        const target = hoverTargetRef.current;
        const current = hoverOpacityRef.current;
        if (Math.abs(target - current) > 0.001) {
          hoverOpacityRef.current += (target - current) * Math.min(dt * fadeSpeed, 1);
        } else {
          hoverOpacityRef.current = target;
        }
      }
      lastTime = time;
      draw();
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [radius, thickness, speed, streak, base, c1, c2, hoverOnly, fadeSpeed]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", padding: thickness, borderRadius: radius }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", borderRadius: Math.max(0, radius - thickness), overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
