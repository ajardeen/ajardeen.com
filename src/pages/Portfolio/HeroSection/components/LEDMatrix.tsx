import { useEffect, useRef } from "react";

const DIGITS: Record<string, number[][]> = {
  "0": [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  "1": [[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  "2": [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  "3": [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
  "4": [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  "5": [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  "6": [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  "7": [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
  "8": [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  "9": [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]],
  ":": [[0,0,0],[0,1,0],[0,0,0],[0,1,0],[0,0,0]],
};

const SHAPES: Record<string, number[][] | null> = {
  smile: [
    [0,0,1,1,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [1,1,0,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,0,1,1,0],
    [1,1,0,0,0,0,1,1,1,0],
    [0,1,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,0,0],
  ],
  heart: [
    [0,1,1,0,0,0,0,1,1,0],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
  ],
  battery: [
    [0,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
  ],
  cry: [
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,1,0,1,0,0,1,0,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,1,1,1,1,0,1,0],
    [0,1,1,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
  ],
  aj: [
    [0,1,1,1,0,0,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,1,0,1,0,0,1],
    [1,0,0,0,1,0,1,0,0,1],
    [1,0,0,0,1,0,1,0,0,1],
    [1,0,0,0,1,0,0,1,1,0],
  ],
  indiaGate: [
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,1,1,1],
  ],
  clock: null,
  hello: null,
  shine: null,
};

const HELLO_MAT = [
  [1,0,1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1],
  [1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
];

const ROWS = 15;
const COLS = 50;
const DOT = 8;
const GAP = 3;
const STEP = DOT + GAP;
const W = COLS * STEP - GAP;
const H = ROWS * STEP - GAP;
const LERP_SPEED = 0.12;

type State = Float32Array;

function buildTarget(mat: number[][]): State {
  const mR = mat.length;
  const mC = mat[0].length;
  const offR = Math.floor((ROWS - mR) / 2);
  const offC = Math.floor((COLS - mC) / 2);
  const t = new Float32Array(ROWS * COLS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const mr = r - offR;
      const mc = c - offC;
      t[r * COLS + c] =
        mr >= 0 && mr < mR && mc >= 0 && mc < mC && mat[mr][mc] === 1 ? 1 : 0;
    }
  }
  return t;
}

function getClockMatrix(timeStr: string): number[][] {
  const mat: number[][] = [[], [], [], [], []];
  for (const ch of timeStr) {
    const d = DIGITS[ch] ?? DIGITS[":"];
    for (let r = 0; r < 5; r++) {
      mat[r].push(...d[r], 0);
    }
  }
  return mat;
}

export function LEDMatrix({ shape = "smile" }: { shape?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<State>(new Float32Array(ROWS * COLS));
  const targetRef = useRef<State>(new Float32Array(ROWS * COLS));
  const rafRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const scrollXRef = useRef(0);
  const waveRef = useRef(-ROWS);
  const timersRef = useRef<{ scroll?: ReturnType<typeof setInterval>; clock?: ReturnType<typeof setInterval>; shine?: number }>({});

  const shapeRef = useRef(shape);
  shapeRef.current = shape;

  // Scale the fixed-size canvas to always fit its container width
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    function applyScale() {
      const availW = wrapper!.clientWidth;
      const scale = Math.min(1, availW / W);
      canvas!.style.transformOrigin = "top left";
      canvas!.style.transform = `scale(${scale})`;
      // Shrink wrapper height to match scaled canvas so no dead space
      wrapper!.style.height = `${Math.round(H * scale)}px`;
    }

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  function drawFrame(ctx: CanvasRenderingContext2D, state: State) {
    ctx.clearRect(0, 0, W, H);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = state[r * COLS + c];
        const x = c * STEP;
        const y = r * STEP;
        if (v > 0.5) {
          ctx.fillStyle = `rgba(240,240,240,${(0.1 + v * 0.9).toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${(0.04 + v * 0.06).toFixed(3)})`;
        }
        ctx.beginPath();
        ctx.roundRect(x, y, DOT, DOT, 1.5);
        ctx.fill();
      }
    }
  }

  function startLerpLoop(ctx: CanvasRenderingContext2D) {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    function tick() {
      const cur = stateRef.current;
      const tgt = targetRef.current;
      let done = true;
      for (let i = 0; i < cur.length; i++) {
        const next = cur[i] + (tgt[i] - cur[i]) * LERP_SPEED;
        cur[i] = Math.abs(next - tgt[i]) < 0.005 ? tgt[i] : next;
        if (cur[i] !== tgt[i]) done = false;
      }
      drawFrame(ctx, cur);
      if (done) {
        isAnimatingRef.current = false;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function transitionTo(mat: number[][], ctx: CanvasRenderingContext2D, immediate = false) {
    const t = buildTarget(mat);
    targetRef.current = t;
    if (immediate) {
      stateRef.current = new Float32Array(t);
      drawFrame(ctx, stateRef.current);
      return;
    }
    startLerpLoop(ctx);
  }

  function stopAll() {
    cancelAnimationFrame(rafRef.current);
    clearInterval(timersRef.current.scroll);
    clearInterval(timersRef.current.clock);
    cancelAnimationFrame(timersRef.current.shine ?? 0);
    isAnimatingRef.current = false;
    scrollXRef.current = COLS;
    waveRef.current = -ROWS;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    stopAll();

    if (shape === "clock") {
      function tick() {
        const ts = new Date().toTimeString().split(" ")[0];
        transitionTo(getClockMatrix(ts), ctx);
      }
      tick();
      timersRef.current.clock = setInterval(tick, 1000);
      return () => stopAll();
    }

    if (shape === "hello") {
      const patW = HELLO_MAT[0].length;
      scrollXRef.current = COLS;

      function scrollTick() {
        const t = new Float32Array(ROWS * COLS);
        const offR = Math.floor((ROWS - HELLO_MAT.length) / 2);
        for (let r = 0; r < HELLO_MAT.length; r++) {
          for (let c = 0; c < COLS; c++) {
            const sc = c + Math.round(scrollXRef.current) - COLS;
            if (sc >= 0 && sc < patW && HELLO_MAT[r][sc] === 1) {
              t[(r + offR) * COLS + c] = 1;
            }
          }
        }
        targetRef.current = t;
        startLerpLoop(ctx);
        scrollXRef.current--;
        if (scrollXRef.current < -patW) scrollXRef.current = COLS;
      }

      scrollTick();
      timersRef.current.scroll = setInterval(scrollTick, 80);
      return () => stopAll();
    }

    if (shape === "shine") {
      const full = new Float32Array(ROWS * COLS).fill(1);
      stateRef.current = full;
      targetRef.current = new Float32Array(full);
      drawFrame(ctx, full);

      function shineStep() {
        const wave = waveRef.current;
        const state = stateRef.current;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const d = r + c;
            const t = Math.max(0, Math.min(1, 1 - Math.abs(d - wave) / 8));
            state[r * COLS + c] = 0.08 + t * 0.92;
          }
        }
        drawFrame(ctx, state);
        waveRef.current += 0.5;
        if (waveRef.current > ROWS + COLS + 20) waveRef.current = -ROWS;
        timersRef.current.shine = requestAnimationFrame(shineStep);
      }

      timersRef.current.shine = requestAnimationFrame(shineStep);
      return () => stopAll();
    }

    const mat = SHAPES[shape];
    if (mat) {
      transitionTo(mat, ctx);
    }

    return () => stopAll();
  }, [shape]);

  return (
    <div className="w-full sm:w-fit  flex justify-center items-center p-2">
      <div className="rounded-xl overflow-hidden bg-[#0a0a0a] dark:bg-transparent p-3 w-full">
        {/* wrapperRef measures available width; canvas scales inside it */}
        <div ref={wrapperRef} className="w-full overflow-hidden relative ">
          <canvas ref={canvasRef} width={W} height={H} style={{ display: "block" }} />
        </div>
      </div>
    </div>
  );
}