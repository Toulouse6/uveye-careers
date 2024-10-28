jQuery(document).ready(function ($) {
    // Fetch positions:
    function loadPositions() {
        fetch('positions.json')
            .then(response => response.json())
            .then(data => {
                const container = $('.careers_wrapper');
                data.positions.forEach(position => {
                    const positionElement = `
                        <div class="careers_box">
                            <a href="${position.apply_link}" class="position-link">
                                <p class="department">${position.department}</p>
                                <h2 class="post-title">${position.title}</h2>
                                <div class="location">${position.location}</div>
                                <hr class="hr_styles" />
                                <div class="apply_now">Apply Now</div>
                            </a>
                        </div>
                    `;
                    container.append(positionElement);
                });

                // Attach search event handler after loading positions:
                attachSearchHandler();
            })
            .catch(error => console.error('Error loading positions:', error));
    }

    function attachSearchHandler() {
        // Event listener for search field input:
        $('.filter_search_field').on('input', function () {
            const searchValue = $(this).val().toLowerCase();
            $('.careers_box').each(function () {
                const department = $(this).find('.department').text().toLowerCase();
                const title = $(this).find('.post-title').text().toLowerCase();
                const location = $(this).find('.location').text().toLowerCase();

                if (title.includes(searchValue) || department.includes(searchValue) || location.includes(searchValue)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            checkIfPositionsAvailable();
        });
    }

    function checkIfPositionsAvailable() {
        const visiblePositions = $('.careers_box:visible').length;
        if (visiblePositions < 1) {
            $('.no_available_positions').show();
        } else {
            $('.no_available_positions').hide();
        }
    }

    loadPositions(); // Initialize the process
});
