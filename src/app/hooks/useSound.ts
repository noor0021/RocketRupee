// Web Audio API synthesized retro arcade sounds — no external files needed

let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!audioCtx) audioCtx = new AudioContext();
    return audioCtx;
};

const play = (fn: (ctx: AudioContext) => void) => {
    try {
        const ctx = getCtx();
        if (ctx.state === 'suspended') ctx.resume();
        fn(ctx);
    } catch {
        // Web Audio not supported — fail silently
    }
};

const beep = (ctx: AudioContext, freq: number, duration: number, type: OscillatorType = 'square', volume = 0.08) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
};

export const sfx = {
    click: () =>
        play((ctx) => beep(ctx, 800, 0.06, 'square', 0.06)),

    navigate: () =>
        play((ctx) => {
            beep(ctx, 400, 0.08, 'sine', 0.05);
            setTimeout(() => beep(ctx, 600, 0.08, 'sine', 0.04), 50);
        }),

    hover: () =>
        play((ctx) => beep(ctx, 1200, 0.03, 'sine', 0.02)),

    correct: () =>
        play((ctx) => {
            beep(ctx, 523, 0.12, 'square', 0.06);
            setTimeout(() => beep(ctx, 659, 0.12, 'square', 0.06), 100);
            setTimeout(() => beep(ctx, 784, 0.18, 'square', 0.06), 200);
        }),

    wrong: () =>
        play((ctx) => {
            beep(ctx, 300, 0.15, 'sawtooth', 0.05);
            setTimeout(() => beep(ctx, 200, 0.2, 'sawtooth', 0.04), 120);
        }),

    complete: () =>
        play((ctx) => {
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                setTimeout(() => beep(ctx, freq, 0.2, 'square', 0.06), i * 100);
            });
        }),

    levelUp: () =>
        play((ctx) => {
            const notes = [392, 494, 587, 659, 784, 988, 1175];
            notes.forEach((freq, i) => {
                setTimeout(() => beep(ctx, freq, 0.15, 'square', 0.05), i * 70);
            });
        }),

    xp: () =>
        play((ctx) => {
            beep(ctx, 880, 0.06, 'square', 0.04);
            setTimeout(() => beep(ctx, 1320, 0.08, 'square', 0.04), 40);
        }),
};
