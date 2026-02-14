
// --- 1. AOS (Animations) Initialize ---
// AOS नीट लोड झाले नसेल तर एरर येऊ नये म्हणून 'try-catch' वापरले आहे
try {
    AOS.init({ 
        once: true,
        duration: 1000 
    });
} catch (e) {
    console.log("AOS animation library not loaded yet.");
}

// --- 2. Pet Data ---
const pets = [
    {
        name: "Buddy",
        age: "2 Years",
        category: "Dog",
        location: "Pune",
        price: "Rs.1500",
        vaccination: "Fully Shielded",
        quote: "I'm a happy-go-lucky boy who loves long walks and belly rubs.",
        image: "images/dog1.jpg"
    },
    {
        name: "Luna",
        age: "6 Months",
        category: "Cat",
        location: "Mumbai",
        price: "Rs.2000",
        vaccination: "Up to Date",
        quote: "I might be small, but I have a huge heart and love to play.",
        image: "images/cat1.jpg"
    },
    {
        name: "Charlie",
        age: "3 Years",
        category: "Dog",
        location: "Parbhani",
        price: "Rs.2500",
        vaccination: "Fully Shielded",
        quote: "The perfect calm companion for cozy movie nights at home.",
        image: "images/dog2.jpg"
    },
    {
        name: "Rubby",
        age: "1 Year",
        category: "Cat",
        location: "Nanded",
        price: "Rs.1500",
        vaccination: "Verified",
        quote: "Very independent but loves a good head scratch.",
        image: "images/cat2.jpg"
    }
    
];

// --- 3. Render Pets Function ---
function renderPets(data) {
    const grid = document.getElementById('pet-grid');
    if (!grid) return;

    if (data.length === 0) {
        grid.innerHTML = `<p style="text-align:center; width:100%; grid-column: 1/-1; padding: 20px;">No pets found matching your search.</p>`;
        return;
    }

    grid.innerHTML = data.map(pet => `
        <div class="pet-card" data-aos="fade-up">
            <div class="card-img">
                <img src="${pet.image}" alt="${pet.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Pet+Image'">
                <span class="category-tag">${pet.category}</span>
            </div>
            <div class="card-info">
                <h3>${pet.name} <span>${pet.age}</span></h3>
                <p class="quote">"${pet.quote}"</p>
                <div class="details">
                    <span><i class="fas fa-map-marker-alt"></i> ${pet.location}</span>
                    <span><i class="fas fa-syringe"></i> ${pet.vaccination}</span>
                </div>
                <div class="price-row">
                    <span class="price">${pet.price}</span>
                    <button class="btn primary" style="padding: 8px 20px; font-size: 0.8rem;" onclick="toggleContact()">Adopt Me</button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- 4. Search Function ---
function searchPets() {
    const searchInput = document.getElementById('petSearch');
    if (!searchInput) return;
    
    const term = searchInput.value.toLowerCase();
    const filtered = pets.filter(p => p.name.toLowerCase().includes(term));
    renderPets(filtered);
}

// --- 5. Filter Function ---
function filterPets(category, btnElement) {
    // बटण हायलाईट बदलण्यासाठी
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (btnElement) {
        btnElement.classList.add('active');
    }

    // फिल्टरिंग लॉजिक
    const filtered = category === 'all' ? pets : pets.filter(p => p.category === category);
    renderPets(filtered);
}

// --- 6. Modal Functions ---
function toggleContact() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        const currentDisplay = window.getComputedStyle(modal).display;
        modal.style.display = (currentDisplay === 'none') ? 'flex' : 'none';
    }
}

// मोडल बाहेर क्लिक केल्यावर बंद करणे
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// --- 8. Form Submission ---
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name && phone.length === 10) {
        alert("Thank you " + name + "! Your request has been submitted.");
        toggleContact();
        document.getElementById('adoptionForm').reset();
    } else {
        alert("Please enter a valid 10-digit phone number.");
    }
}

// --- 9. Initial Load ---
window.onload = function() {
    renderPets(pets);
};


let currentSlide = 0;

function moveSlider(direction) {
    const slider = document.getElementById('reviewSlider');
    const cards = document.querySelectorAll('.review-card');
    const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
    const maxSlides = cards.length - (window.innerWidth > 768 ? 2 : 1);

    currentSlide += direction;

    // मर्यादा (Limits) तपासणे
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > maxSlides) {
        currentSlide = maxSlides;
    }

    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

// Auto-slide (पर्यायी: दर ५ सेकंदांनी आपोआप स्लाइड होण्यासाठी)
setInterval(() => {
    const cards = document.querySelectorAll('.review-card');
    const maxSlides = cards.length - (window.innerWidth > 768 ? 2 : 1);
    
    if (currentSlide < maxSlides) {
        moveSlider(1);
    } else {
        currentSlide = -1;
        moveSlider(1);
    }
}, 5000);

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    let current = +counter.innerText.replace(/\D/g, '');

    const increment = Math.ceil(target / 100);

    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
      
      // symbols add back
      if (counter.dataset.target == "500") counter.innerText += "+";
      if (counter.dataset.target == "100") counter.innerText += "%";
    }
  };

  updateCount();
});
