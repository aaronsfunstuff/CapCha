document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const objectCount = 5; // Number of objects
    const objects = [];
    let targetObjectIndex;

    // Create objects
    for (let i = 0; i < objectCount; i++) {
        const object = document.createElement('div');
        object.classList.add('captcha-object');
        gameArea.appendChild(object);
        objects.push(object);
    }

    // Choose a random object as the target
    targetObjectIndex = Math.floor(Math.random() * objectCount);
    objects[targetObjectIndex].classList.add('target');

    // Generate random position for all objects
    function generateRandomPosition() {
        objects.forEach(object => {
            const maxX = gameArea.clientWidth - object.clientWidth;
            const maxY = gameArea.clientHeight - object.clientHeight;

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            object.style.top = `${randomY}px`;
            object.style.left = `${randomX}px`;
        });
    }

    // Initial position on load
    generateRandomPosition();

    // Event listener for object click
    objects.forEach((object, index) => {
        object.addEventListener('click', () => {
            if (index === targetObjectIndex) {
                alert('You clicked the correct object!');
            } else {
                alert('Oops! That\'s not the correct object.');
            }
            generateRandomPosition();
            // Choose a new target object
            targetObjectIndex = Math.floor(Math.random() * objectCount);
            objects.forEach((obj, idx) => {
                if (idx === targetObjectIndex) {
                    obj.classList.add('target');
                } else {
                    obj.classList.remove('target');
                }
            });
        });
    });
});
