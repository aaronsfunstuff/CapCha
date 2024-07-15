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

    // Choose Image 1 as the target
    targetIndex = 0; // Index of Image 1

    // Position all images randomly within game area
    positionImages();

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
        if (targetIndex === 0 && images[targetIndex].classList.contains('target')) {
            alert('Correct! You clicked the correct image.');
        } else {
            alert('Incorrect! Try again.');
        }
        resetGame();
    });

    // Function to reset the game
    function resetGame() {
        images.forEach(img => img.classList.remove('target')); // Remove all highlights
        targetIndex = 0; // Reset target to Image 1
        images[targetIndex].classList.add('target'); // Highlight Image 1 again

        // Re-position images randomly within game area
        positionImages();
    }

    // Function to position images randomly without overlapping
    function positionImages() {
        const positions = [];
        const maxWidth = gameArea.clientWidth;
        const maxHeight = gameArea.clientHeight;
        const imageWidth = images[0].clientWidth;
        const imageHeight = images[0].clientHeight;

        images.forEach((image, index) => {
            let x, y;
            do {
                x = Math.random() * (maxWidth - imageWidth);
                y = Math.random() * (maxHeight - imageHeight);
            } while (isOverlapping(x, y, imageWidth, imageHeight, positions));

            image.style.left = `${x}px`;
            image.style.top = `${y}px`;
            positions.push({ x, y, width: imageWidth, height: imageHeight });
        });
    }

    // Function to check if the new image position overlaps with existing positions
    function isOverlapping(x, y, width, height, positions) {
        for (let pos of positions) {
            if (x < pos.x + pos.width &&
                x + width > pos.x &&
                y < pos.y + pos.height &&
                y + height > pos.y) {
                return true; // Overlaps
            }
        }
        return false; // Does not overlap
    }
});
