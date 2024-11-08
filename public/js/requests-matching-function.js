document.addEventListener('DOMContentLoaded', function () {
    const createdAtElements = document.querySelectorAll('[id^="createdAt-"]');
    
    createdAtElements.forEach(element => {
      const createdAt = element.getAttribute('data-created-at');
      const formattedDateTime = dayjs(createdAt).format('DD MMM YYYY [at] HH:mm');
      element.innerText = formattedDateTime;
    });
  });
    
    function toggleRequests(postIndex) {
        const requestCards = document.getElementById(`request-cards-${postIndex}`);
        
        if (requestCards.style.display === 'none') {
          requestCards.style.display = 'block';
        } else {
          requestCards.style.display = 'none';
        }
      }
      
    function openContactForm(animalName, ownerPhone) {
        alert(`Contacting owner of ${animalName}. Phone: ${ownerPhone}`);
    }