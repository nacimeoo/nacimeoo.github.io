window.addEventListener('load', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.children;
    const dots = carousel.querySelector('.dots');
    let index = 0;

    if (slides.length === 0) { carousel.remove(); return; }
    if (slides.length === 1) { carousel.classList.add('single'); return; }

    [...slides].forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dots.appendChild(dot);
    });

    function go(i) {
      index = (i + slides.length) % slides.length; 
      track.style.transform = `translateX(-${index * 100}%)`;
      [...dots.children].forEach((d, j) => d.classList.toggle('active', j === index));
    }

    carousel.querySelector('.prev').addEventListener('click', () => go(index - 1));
    carousel.querySelector('.next').addEventListener('click', () => go(index + 1));

    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });

    go(0);
  });
});
