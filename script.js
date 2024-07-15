document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const checkBtn = document.getElementById('check-btn');
    const imageCount = 7; // Number of images
    const images = [];
    let clickedCarImages = [];

    // Real image URLs (replace with your actual image paths)
    const realImageUrls = [
        'https://www.usnews.com/object/image/0000018d-fbc4-ddec-a3fd-fbef35f20000/24my-brzts-sicily-14.jpg?update-time=1709325955761&size=responsive640',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dzAY9vxSYgd7Zz6Aji9j2-LaG3-BF5iw5w&s',
        'https://trimet.org/bus/img/media.jpg',
        'https://i.abcnewsfe.com/a/29ad17e0-4dec-488a-9c27-bdc2424ba5a5/electric-plane-ht-ml-240110_1704902584341_hpMain_16x9.jpg?w=992',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS869IPfEZUL1r3qfQCctsbWg56jibypFZjlg&s',
      'https://cdn.pixabay.com/photo/2024/03/01/19/57/airbus-8607152_1280.jpg',
    'https://media.istockphoto.com/id/178489146/photo/high-speed-train.jpg?s=612x612&w=0&k=20&c=j9WfvXQYG5IROhtp0tHWExvLlhAUaCqQNYOGnrH8TvA='
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

    designateCarImages(); // Designate images 1 and 2 as car images
    positionImages(); // Position images initially

    // Event listener for image click
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            if (!clickedCarImages.includes(image)) {
                image.classList.add('target'); // Highlight clicked image
                clickedCarImages.push(image); // Add clicked image to array
            }
        });
    });

    // Event listener for check button
    checkBtn.addEventListener('click', () => {
        if (clickedCarImages.length === 2 && clickedCarImages.every(img => img.classList.contains('car'))) {
            alert('Correct! You clicked both car images.');
        } else {
            alert('Incorrect! Click both car images to verify.');
        }
        resetGame();
    });

    // Function to reset the game
    function resetGame() {
        images.forEach(img => {
            img.classList.remove('target');
        });
        clickedCarImages = [];
        shuffleImages(); // Shuffle images on reset
        positionImages(); // Re-position images after shuffling
    }

    // Function to designate images 1 and 2 as cars
    function designateCarImages() {
        images[0].classList.add('car'); // Image 1 as car
        images[1].classList.add('car'); // Image 2 as car
    }

    // Function to shuffle images
    function shuffleImages() {
        images.sort(() => Math.random() - 0.5); // Shuffle array of images
        images.forEach((image, index) => {
            gameArea.appendChild(image); // Append shuffled images to game area
        });
    }

    // Function to position images without overlapping
    function positionImages() {
        const positions = [];
        const maxWidth = gameArea.clientWidth - 100; // Adjust for image width
        const maxHeight = gameArea.clientHeight - 100; // Adjust for image height
        const imageWidth = images[0].clientWidth;
        const imageHeight = images[0].clientHeight;

        images.forEach((image, index) => {
            let x, y;
            do {
                x = Math.random() * maxWidth;
                y = Math.random() * maxHeight;
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
