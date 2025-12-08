module.exports = {
          theme: {
            extend: {
              keyframes: {
                customBounce: {
                  '0%, 100%': { transform: 'translateY(-5px)', animationTimingFunction: 'ease-in-out' },
                  '50%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out' },
                },
              },
              animation: {
                customBounce: 'customBounce 0.5s ease-in-out', // Adjust duration and timing
              },
            },
          },
          plugins: [],
        };