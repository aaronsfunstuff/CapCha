document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const checkBtn = document.getElementById('check-btn');
    const imageCount = 5; // Number of images
    const images = [];
    let targetIndex;

    // Real image URLs (replace with your actual image paths)
    const realImageUrls = [
        'https://www.usnews.com/object/image/0000018d-fbc4-ddec-a3fd-fbef35f20000/24my-brzts-sicily-14.jpg?update-time=1709325955761&size=responsive640',
        'https://img.canarymedia.com/content/uploads/eddie-bugajewski-hS7Jc3JmiBo-unsplash.jpeg?auto=compress,format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=418&q=82&w=800&s=1a0f10f47976d99f81bd39dfff6211bf',
        'https://trimet.org/bus/img/media.jpg',
        'https://i.abcnewsfe.com/a/29ad17e0-4dec-488a-9c27-bdc2424ba5a5/electric-plane-ht-ml-240110_1704902584341_hpMain_16x9.jpg?w=992',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS869IPfEZUL1r3qfQCctsbWg56jibypFZjlg&s'
    ];

    // Create images
    for (let i = 0; i < imageCount; i++) {
        const image = document.createElement('img');
        image.src = realImageUrls[i]; // Set real image URL
        image.alt = `Image ${i + 1}`;
        image.classList.add('captcha-image');
        gameArea.appendChild(image);
        images.push(image);
    }

    // Choose a random image as the target
    targetIndex = Math.floor(Math.random() * imageCount);
    images[targetIndex].classList.add('target');

    // Position all images randomly within game area
    images.forEach(image => {
        generateRandomPosition(image);
    });

    // Event listener for image click
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            images.forEach(img => img.classList.remove('target')); // Clear previous target
            image.classList.add('target'); // Highlight clicked image as the target
            targetIndex = index; // Update target index
        });
    });

    // Event listener for check button
    checkBtn.addEventListener('click', () => {
        if (images[targetIndex].classList.contains('target')) {
            alert('Correct! You clicked the correct image.');
        } else {
            alert('Incorrect! Try again.');
        }
        resetGame();
    });

    // Function to reset the game
    function resetGame() {
        images.forEach(img => img.classList.remove('target')); // Remove all highlights
        targetIndex = Math.floor(Math.random() * imageCount); // Choose a new target
        images[targetIndex].classList.add('target'); // Highlight the new target

        // Re-position images randomly within game area
        images.forEach(image => {
            generateRandomPosition(image);
            image.style.opacity = 1; // Reset opacity
        });
    }

    // Optional: Add a slight delay for visual appeal
    setTimeout(() => {
        images.forEach(image => {
            image.style.transitionDelay = `${Math.random() * 0.5}s`;
            image.style.opacity = 1;
        });
    }, 100);
});

// Function to generate random position within game area
function generateRandomPosition(image) {
    const gameArea = document.getElementById('game-area');
    const maxX = gameArea.clientWidth - image.clientWidth;
    const maxY = gameArea.clientHeight - image.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    image.style.top = `${randomY}px`;
    image.style.left = `${randomX}px`;
}

