const wheel = document.querySelector('.wheel');
        const spinBtn = document.querySelector('.spin-button');
        const result = document.querySelector('.result');

        // Define 16 distinct colors for better visibility
        const colors = [
            '#FF4136', // Red
            '#FF851B', // Orange
            '#FFDC00', // Yellow
            '#2ECC40', // Green
            '#0074D9', // Blue
            '#B10DC9', // Purple
            '#F012BE', // Magenta
            '#01FF70', // Lime
            '#7FDBFF', // Light Blue
            '#FB6A4A', // Coral
            '#39CCCC', // Teal
            '#85144b', // Maroon
            '#FF4136', // Red variant
            '#FF851B', // Orange variant
            '#FFDC00', // Yellow variant
            '#2ECC40'  // Green variant
        ];
        const arr=['S','U','M','A','D','H','W','A','','V','I','J','A','Y','A','']
        for (let i = 0; i < 16; i++) {
            const section = document.createElement('div');
            section.className = 'wheel-section';
            // Calculate exact rotation for 16 parts (360/16 = 22.5 degrees per section)
            section.style.transform = `rotate(${i * 22.5}deg)`;
            section.style.backgroundColor = colors[i];
            
            const number = document.createElement('div');
            number.className = 'number';
            number.textContent = arr[i%16];
            number.style.transform= `rotate(${-i * 22.5}deg)`;
            section.appendChild(number);
            
            wheel.appendChild(section);
        }

        const friction = 0.995;
        const minSpinTime = 4000;
        const maxInitialVelocity = 1800;
        const minInitialVelocity = 1200;

        let isSpinning = false;
        let currentRotation = 0;
        let velocity = 0;
        let lastTimestamp = 0;

        function spin() {
            if (isSpinning) return;
            
            spinBtn.disabled = true;
            isSpinning = true;
            result.textContent = '';
            result.style.backgroundColor = '';
            
            velocity = Math.random() * (maxInitialVelocity - minInitialVelocity) + minInitialVelocity;
            
            lastTimestamp = performance.now();
            requestAnimationFrame(updateSpin);
        }

        function updateSpin(timestamp) {
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            velocity *= friction;
            currentRotation += velocity * (deltaTime / 1000);
            
            wheel.style.transform = `rotate(${currentRotation}deg)`;
            
            if (velocity > 0.1 && performance.now() - lastTimestamp < minSpinTime) {
                requestAnimationFrame(updateSpin);
            } else {
                finishSpin();
            }
        }

        function finishSpin() {
            isSpinning = false;
            spinBtn.disabled = false;
            
            const normalizedRotation = ((currentRotation % 360) + 360) % 360;
            const sectionSize = 360 / 16; // Exactly 22.5 degrees per section
            const winningIndex = Math.floor(normalizedRotation / sectionSize);
            const winningNumber = 16 - winningIndex;
            
            if (1<=winningNumber <=16)
                result.textContent = `SARGA ${winningNumber} !`;
            else
                    result.textContent = 'FAILED! Please Refresh the page';
            // result.style.backgroundColor = colors[(16 - winningNumber) % 16];
            result.style.animation = 'winner 0.5s ease-in-out';
            
            setTimeout(() => {
                result.style.animation = 'none';
            }, 500);
        }

        spinBtn.addEventListener('click', spin);
        wheel.addEventListener('click', spin);