document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('reservation-filter');
  if (filterForm) {
    filterForm.addEventListener('change', (event) => {
      if (event.target && (event.target.id === 'instrument-select' || event.target.id === 'date-input')) {
        filterForm.submit();
      }
    });
  }

  const startInput = document.getElementById('start_time');
  const endInput = document.getElementById('end_time');
  if (startInput && endInput) {
    const syncEndMin = () => {
      endInput.min = startInput.value;
    };
    startInput.addEventListener('change', syncEndMin);
    syncEndMin();
  }
});
