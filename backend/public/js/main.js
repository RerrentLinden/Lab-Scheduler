document.addEventListener('DOMContentLoaded', () => {
  const flash = document.querySelector('.flash');
  if (flash) {
    setTimeout(() => {
      flash.classList.add('hide');
    }, 4000);
  }
});
