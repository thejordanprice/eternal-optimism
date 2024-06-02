$(document).ready(function() {
    function reloadScreen() {
        const averageLifespanYears = 79;
        const weeksInYear = 52;
        const totalWeeks = averageLifespanYears * weeksInYear;
        const birthdate = localStorage.getItem('birthdate');
        const birthDate = new Date(birthdate || '1990-01-01'); // Default
        const currentDate = new Date();

        // Calculate the number of weeks lived
        const weeksLived = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24 * 7));
        const currentWeekOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24 * 7));

        // Clear existing grid
        $('#weeks-grid').empty();

        // Populate the weeks grid
        for (let i = 0; i < totalWeeks; i++) {
            let squareClass = 'remaining';
            if (i < weeksLived) {
                squareClass = 'completed';
            } else if (i === weeksLived) {
            squareClass = 'current';
            }

            const weekNumber = i + 1;
            const ageInWeeks = Math.floor(weekNumber / weeksInYear);
            const ageInDays = weekNumber * 7;
            const ageInYears = Math.floor(ageInDays / 365);
            const remainingDays = ageInDays % 365;

            const tooltipText = `Week: ${weekNumber}, Age: ${ageInYears} years and ${remainingDays} days`;

            $('#weeks-grid').append(
                `<div class="square ${squareClass}" data-toggle="tooltip" data-placement="top" title="${tooltipText}"></div>`
            );
        }

        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();

        // Display stats
        $('#completed-weeks').text(`${weeksLived}`);
        $('#remaining-weeks').text(`${totalWeeks - weeksLived}`);
        $('#percentage-completed').text(`${((weeksLived / totalWeeks) * 100).toFixed(2)}%`);

        // Update current date/time
        function updateDateTime() {
            $('#current-date-time').text(`Current Date/Time: ${new Date().toLocaleString()}`);
        }
        setInterval(updateDateTime, 1000);
        updateDateTime();

        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            $('#quote').text(quotes[randomIndex]);
        }
        setInterval(displayRandomQuote, 5000);
        displayRandomQuote();
    }

    // Check if birthdate exists in localStorage
    const birthdate = localStorage.getItem('birthdate');
    if (!birthdate) {
        $('#birthdateModal').modal('show');
    } else {
        reloadScreen();
    }

    // Save birthdate to localStorage and reload the screen
    $('#saveBirthdate').click(function() {
        const birthdateInput = $('#birthdateInput').val();
        if (birthdateInput) {
            localStorage.setItem('birthdate', birthdateInput);
            $('#birthdateModal').modal('hide');
            reloadScreen();
        }
    });
});