$(document).ready(function () {
    // Load job details by job ID:
    function loadJobDetails(jobId) {
        fetch('../positions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const job = data.positions.find(job => job.id === jobId);

                if (job) {
                    $('#department').text(job.department);
                    $('#position-title').text(job.title);
                    $('#location').text(`${job.location} · ${job.employment_type}`);
                    $('#overview').html(job.overview);
                    $('#responsibilities').html(job.responsibilities);
                } else {
                    $('#no-positions').show();
                    $('.comeet_position_data_wrapper').hide();
                }
            })
            .catch(error => {
                console.error('Error loading job details:', error);
                $('#no-positions').show();
                $('.comeet_position_data_wrapper').hide();
            });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    // Load job details by ID:
    if (jobId) {
        loadJobDetails(jobId);
    } else {
        $('#no-positions').show();
        $('.comeet_position_data_wrapper').hide();
    }
});
