document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById('propertyModal');
  const viewButtons = document.querySelectorAll('.view-btn');
  const closeModal = document.querySelector('.close-modal');

  if (modal) {
    const openModal = () => {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };
    const hideModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    viewButtons.forEach(btn => btn.addEventListener('click', openModal));
    if (closeModal) closeModal.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideModal();
    });
  }


  const viewOptionButtons = document.querySelectorAll('.view-options button');
  const grid = document.querySelector('.grid');

  const setGridMode = (mode) => {
    if (!grid) return;


    grid.style.gridTemplateColumns = '';
    grid.querySelectorAll('.property-card').forEach(card => {
      card.style.gridColumn = '';
    });

    if (mode === 'list') {
  
      grid.style.gridTemplateColumns = '1fr';
      grid.querySelectorAll('.property-card').forEach(card => {
        card.style.gridColumn = 'span 12';
      });
    } else {
  
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    }
  };

  viewOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
      viewOptionButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const isList = button.querySelector('.fa-list') !== null;
      setGridMode(isList ? 'list' : 'grid');
    });
  });

  
  const initialList = document.querySelector('.view-options button.active .fa-list') !== null;
  setGridMode(initialList ? 'list' : 'grid');


  const priceRangeInput = document.querySelector('.filter-range input[type="range"]');
  const priceDisplayWrapper = document.querySelector('.price-range');
  const minSpan = priceDisplayWrapper ? priceDisplayWrapper.querySelector('span:first-child') : null;
  const maxSpan = priceDisplayWrapper ? priceDisplayWrapper.querySelector('span:last-child') : null;

  const formatMillions = (num) => `E£ ${Number(num).toLocaleString('en-US')}M`;

  if (priceRangeInput && minSpan && maxSpan) {
 
    const minAttr = Number(priceRangeInput.min || 5);
    const maxAttr = Number(priceRangeInput.max || 100);

   
    minSpan.textContent = formatMillions(minAttr);
    maxSpan.textContent = formatMillions(priceRangeInput.value || maxAttr);

    priceRangeInput.addEventListener('input', () => {
      const currentValue = Number(priceRangeInput.value);
      maxSpan.textContent = formatMillions(currentValue);
    });
  }


  const resetBtn = document.querySelector('.reset-btn');
  const applyBtn = document.querySelector('.apply-btn'); 

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      
      document.querySelectorAll('.filters input[type="checkbox"]').forEach(cb => (cb.checked = false));

    
      if (priceRangeInput) {
        priceRangeInput.value = priceRangeInput.max || 100;
        if (maxSpan) maxSpan.textContent = formatMillions(priceRangeInput.value);
      }
    });
  }
});
