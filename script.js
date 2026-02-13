const noBtn = document.getElementById('noBtn');

function moveNoButton() {
    // Get the button dimensions
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Get random position within the viewport, accounting for button size
    const randomX = Math.random() * (window.innerWidth - buttonWidth);
    const randomY = Math.random() * (window.innerHeight - buttonHeight);
    
    // Move the button to the random position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Spam sad GIFs on screen
    createSadGifs();
}

function yesClicked() {
    createConfetti();
    
    const card = document.querySelector('.card');
    card.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 30px; margin: 20px 0 40px 0;">
            <img src="yay.gif" style="width: 90%; height: auto; max-width: 700px; min-height: 500px; border-radius: 15px;" alt="Yay GIF">
        </div>
        
        <div style="background: #f5f5f5; padding: 40px; border-radius: 15px; margin: 30px 0; text-align: left;">
            <p style="font-size: 1.3em; margin: 15px 0;"><strong>📍 Place:</strong> To be announced</p>
            <p style="font-size: 1.3em; margin: 15px 0;"><strong>📅 Date:</strong> To be announced</p>
            <p style="font-size: 1.3em; margin: 15px 0;"><strong>⏰ Time:</strong> To be announced</p>
        </div>
        
        <p style="color: #666; font-size: 1.6em; margin: 20px 0;color: black;">See you later 😉</p>
        
        <div style="display: flex; justify-content: center; margin: 20px 0;">
            <button class="btn yes-btn" style="margin-bottom: 20px;" onclick="captureAndDownload()">🖨️ Print</button>
        </div>
        
        <p style="color: #000000; font-size: 0.95em; margin-top: 20px; font-style: italic;">
            📸 Please take a screenshot and send it to me!
        </p>
    `;
    card.style.animation = 'none';
    card.style.background = 'linear-gradient(135deg, #ff6b9d, #ffb7d5)';
    card.style.padding = '60px 80px';
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ff8fab', '#ffb7d5', '#c06c84', '#6c5b7b', '#ffd700', '#ff69b4'];
    
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.top = '-10px';
        confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
        confettiPiece.style.height = confettiPiece.style.width;
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.borderRadius = '50%';
        confettiPiece.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        confettiContainer.appendChild(confettiPiece);
        
        setTimeout(() => confettiPiece.remove(), 5000);
    }
}

// Add animation for confetti falling
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes sadFade {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function createSadGifs() {
    const sadGifsContainer = document.getElementById('sadGifs');
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const sadImages = ['sad1.jpg', 'sad2.jpg', 'sad3.jpg', 'sad4.jpg', 'sad5.jpg'];
    
    // Show 2 sad pictures one by one with fade in/out
    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            let randomX, randomY;
            let validPosition = false;
            
            // Keep generating random positions until we find one that doesn't overlap with the card
            while (!validPosition) {
                randomX = Math.random() * (window.innerWidth - 200);
                randomY = Math.random() * (window.innerHeight - 200);
                
                // Check if position overlaps with card
                if (randomX + 200 < cardRect.left || 
                    randomX > cardRect.right || 
                    randomY + 200 < cardRect.top || 
                    randomY > cardRect.bottom) {
                    validPosition = true;
                }
            }
            
            const sadImg = document.createElement('img');
            sadImg.src = sadImages[Math.floor(Math.random() * sadImages.length)];
            sadImg.className = 'sad-gif';
            sadImg.style.left = randomX + 'px';
            sadImg.style.top = randomY + 'px';
            sadGifsContainer.appendChild(sadImg);
            
            // Remove after animation completes
            setTimeout(() => sadImg.remove(), 2000);
        }, i * 300); // 300ms delay between each picture
    }
}

// Function to create and capture a separate downloadable layout
function createDownloadableVersion() {
    // Create a hidden container for the downloadable version
    const downloadContainer = document.createElement('div');
    downloadContainer.id = 'downloadableVersion';
    
    // Adjust width based on screen size
    let containerWidth = '900px';
    let padding = '60px 80px';
    
    if (window.innerWidth <= 480) {
        containerWidth = 'calc(100vw - 40px)';
        padding = '40px 20px';
    } else if (window.innerWidth <= 768) {
        containerWidth = 'calc(100vw - 60px)';
        padding = '50px 30px';
    } else if (window.innerWidth <= 900) {
        containerWidth = '90vw';
        padding = '60px 40px';
    }
    
    downloadContainer.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: ${containerWidth};
        background: linear-gradient(135deg, #ff6b9d, #ffb7d5);
        padding: ${padding};
        border-radius: 20px;
        font-family: Arial, sans-serif;
    `;
    
    downloadContainer.innerHTML = `
        <div style="text-align: center;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 30px; margin: 20px 0 40px 0;">
                <img src="yay.gif" style="width: 90%; height: auto; max-width: 700px; min-height: 500px; border-radius: 15px;" alt="Yay GIF">
            </div>
            
            <div style="background: #f5f5f5; padding: 40px; border-radius: 15px; margin: 80px 0 40px 0; text-align: left;">
                <p style="font-size: 1.5em; margin: 20px 0;"><strong>📍 Place:</strong> Araneta Cubao ( Di ko alam saan kakain)</p>
                <p style="font-size: 1.5em; margin: 20px 0;"><strong>📅 Date:</strong> February 14, 2026 Saturday</p>
                <p style="font-size: 1.5em; margin: 20px 0;"><strong>⏰ Time:</strong> To be announced</p>
            </div>
            
            <p style="color: #666; font-size: 30px; margin: 40px 0; text-align: center; color: black;">See you later 😉</p>
        </div>
    `;
    
    document.body.appendChild(downloadContainer);
    return downloadContainer;
}

// Function to capture screenshot and save to downloads
function captureAndDownload() {
    // Create the downloadable version
    const downloadableVersion = createDownloadableVersion();
    
    setTimeout(() => {
        if (typeof html2canvas === 'undefined') {
            alert('Screenshot library is loading. Please try again in a moment.');
            document.body.removeChild(downloadableVersion);
            return;
        }
        
        html2canvas(downloadableVersion, {
            allowTaint: true,
            useCORS: true,
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        }).then(canvas => {
            // Convert canvas to blob and download
            canvas.toBlob(function(blob) {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'valentines-' + new Date().getTime() + '.png';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                    document.body.removeChild(downloadableVersion);
                    window.URL.revokeObjectURL(url);
                }, 100);
            }, 'image/png', 0.95);
        }).catch(err => {
            console.error('Screenshot failed:', err);
            document.body.removeChild(downloadableVersion);
            alert('Failed to capture screenshot. Error: ' + err.message);
        });
    }, 500);
}

// Optional: Make the No button move even when trying to click on it
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});
