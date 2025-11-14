import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fire = (options = {}) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9AB1', '#FFD29E', '#FF7AB6'],
      ...options
    });
  };

  const burst = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fireConfetti(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fireConfetti(0.25, { spread: 26, startVelocity: 55 });
    fireConfetti(0.2, { spread: 60 });
    fireConfetti(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fireConfetti(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fireConfetti(0.1, { spread: 120, startVelocity: 45 });
  };

  return { fire, burst };
};
