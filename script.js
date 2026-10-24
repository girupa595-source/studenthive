document.addEventListener("DOMContentLoaded", function () {

    // Navbar
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const icon = menuToggle.querySelector("i");
        const isOpen = navLinks.classList.contains("open");

        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.querySelector("i").className = "fa-solid fa-bars";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            navLinks.classList.remove("open");
            menuToggle.querySelector("i").className = "fa-solid fa-bars";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Events Data
    const events = [
        {
            id: 1,
            title: "National Hackathon 2026",
            category: "Tech",
            date: "November 7, 2026",
            time: "9:00 AM - 6:00 PM",
            venue: "Main Auditorium",
            organizer: "Computer Science Department",
            image: "images/hackathon.jpg",
            shortDescription: "Build innovative solutions, collaborate with developers, and bring your ideas to life.",
            description: "Join our campus hackathon for an exciting day of coding, teamwork, and creative problem-solving. Form a team, develop a working prototype, present your idea to the judges, and learn from fellow innovators. Students interested in web development, artificial intelligence, app development, and technology are welcome."
        },
        {
            id: 2,
            title: "Web Development Workshop",
            category: "Tech",
            date: "November 12, 2026",
            time: "10:00 AM - 1:00 PM",
            venue: "Computer Lab 2",
            organizer: "Coding Club",
            image: "images/web-workshop.jpg",
            shortDescription: "Learn HTML, CSS, and JavaScript by building your own responsive website.",
            description: "Take part in a practical web development workshop designed for beginners. Learn how HTML structures a webpage, how CSS creates attractive layouts, and how JavaScript adds interactivity. Bring your laptop and create a mini website with guidance from the Coding Club."
        },
        {
            id: 3,
            title: "Campus Music Night",
            category: "Cultural",
            date: "November 15, 2026",
            time: "5:00 PM - 8:00 PM",
            venue: "Open-Air Stage",
            organizer: "Music Club",
            image: "images/music-night.jpg",
            shortDescription: "Enjoy live performances, student bands, singing, and an unforgettable evening.",
            description: "Celebrate music and creativity at StudentHive Music Night. Enjoy live singing, instrumental performances, student bands, and special performances by talented students. Students interested in performing can contact the Music Club to learn about participation opportunities."
        },
        {
            id: 4,
            title: "Intercollege Dance Fest",
            category: "Cultural",
            date: "November 20, 2026",
            time: "3:00 PM - 7:00 PM",
            venue: "College Convention Hall",
            organizer: "Cultural Committee",
            image: "images/dance-fest.jpg",
            shortDescription: "Celebrate dance, creativity, and culture with energetic student performances.",
            description: "Get ready for an exciting dance festival featuring solo performances, group choreography, and a variety of dance styles. Represent your department, cheer for your friends, and enjoy a celebration of talent and cultural expression."
        },
        {
            id: 5,
            title: "Interdepartment Cricket Cup",
            category: "Sport",
            date: "November 24, 2026",
            time: "8:00 AM - 4:00 PM",
            venue: "College Cricket Ground",
            organizer: "Sports Committee",
            image: "images/cricket-cup.jpg",
            shortDescription: "Compete with other departments and show off your cricket skills.",
            description: "Bring your team spirit to the Interdepartment Cricket Cup. Departments will compete in an exciting cricket tournament focused on teamwork, sportsmanship, and healthy competition. Contact the Sports Committee for team entry requirements and match rules."
        },
        {
            id: 6,
            title: "Annual College Sports Day",
            category: "Sport",
            date: "November 28, 2026",
            time: "8:30 AM - 3:30 PM",
            venue: "College Sports Ground",
            organizer: "Physical Education Department",
            image: "images/sports-day.jpg",
            shortDescription: "Take part in track events, team games, and fun sporting challenges.",
            description: "Join our annual Sports Day for a celebration of fitness, teamwork, and achievement. Participate in track and field events, relay races, and team games, or cheer for your classmates. Contact the Physical Education Department for registration and event-specific rules."
        }
    ];

    // HTML Elements
    const eventsGrid = document.getElementById("eventsGrid");
    const eventSearch = document.getElementById("eventSearch");
    const eventCount = document.getElementById("eventCount");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const clearSearch = document.getElementById("clearSearch");
    const noEvents = document.getElementById("noEvents");
    const resetFilters = document.getElementById("resetFilters");

    let selectedCategory = "All";

    // Create Event Cards
    function createEventCard(event) {
        const card = document.createElement("article");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-image-wrap">
                <img src="${event.image}" alt="${event.title}" class="event-image" loading="lazy">
                <span class="event-category">${event.category}</span>
            </div>

            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p class="event-card-description">${event.shortDescription}</p>

                <div class="event-meta">
                    <p><i class="fa-solid fa-calendar"></i> ${event.date}</p>
                    <p><i class="fa-solid fa-clock"></i> ${event.time}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${event.venue}</p>
                </div>

                <button class="view-details" data-id="${event.id}">
                    View Details
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;

        return card;
    }

    // Display and Filter Events
    function displayEvents() {
        const searchText = eventSearch.value.toLowerCase().trim();

        const filteredEvents = events.filter(function (event) {
            const matchesCategory =
                selectedCategory === "All" ||
                event.category === selectedCategory;

            const eventDetails = (
                event.title + " " +
                event.category + " " +
                event.date + " " +
                event.time + " " +
                event.venue + " " +
                event.organizer + " " +
                event.shortDescription + " " +
                event.description
            ).toLowerCase();

            return matchesCategory && eventDetails.includes(searchText);
        });

        eventsGrid.innerHTML = "";

        filteredEvents.forEach(function (event) {
            eventsGrid.appendChild(createEventCard(event));
        });

        eventCount.textContent =
            filteredEvents.length + " " +
            (filteredEvents.length === 1 ? "event" : "events") +
            " found";

        noEvents.hidden = filteredEvents.length !== 0;
        clearSearch.classList.toggle("visible", eventSearch.value.length > 0);
    }

    // Category Buttons
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
                item.removeAttribute("aria-pressed");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            displayEvents();
        });
    });

    // Search Events
    eventSearch.addEventListener("input", displayEvents);

    clearSearch.addEventListener("click", function () {
        eventSearch.value = "";
        displayEvents();
        eventSearch.focus();
    });

    // Reset Search and Filters
    resetFilters.addEventListener("click", function () {
        selectedCategory = "All";
        eventSearch.value = "";

        filterButtons.forEach(function (button) {
            const isAll = button.dataset.category === "All";

            button.classList.toggle("active", isAll);
            button.setAttribute("aria-pressed", isAll);
        });

        displayEvents();
    });

    // Event Details Popup
    const eventModal = document.getElementById("eventModal");
    const modalBox = eventModal.querySelector(".event-modal");
    const modalClose = document.getElementById("modalClose");
    const modalDone = document.getElementById("modalDone");

    let previousButton = null;

    function openModal(eventId, button) {
        const event = events.find(function (item) {
            return item.id === eventId;
        });

        if (!event) return;

        previousButton = button;

        document.getElementById("modalImage").src = event.image;
        document.getElementById("modalImage").alt = event.title;
        document.getElementById("modalCategory").textContent = event.category;
        document.getElementById("modalTitle").textContent = event.title;
        document.getElementById("modalDate").textContent = event.date;
        document.getElementById("modalTime").textContent = event.time;
        document.getElementById("modalVenue").textContent = event.venue;
        document.getElementById("modalOrganizer").textContent = event.organizer;
        document.getElementById("modalDescription").textContent = event.description;

        eventModal.hidden = false;
        eventModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        modalBox.focus();
    }

    function closeModal() {
        if (eventModal.hidden) return;

        eventModal.hidden = true;
        eventModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (previousButton && previousButton.isConnected) {
            previousButton.focus();
        }
    }

    eventsGrid.addEventListener("click", function (event) {
        const button = event.target.closest(".view-details");

        if (button) {
            openModal(Number(button.dataset.id), button);
        }
    });

    modalClose.addEventListener("click", closeModal);
    modalDone.addEventListener("click", closeModal);

    eventModal.addEventListener("click", function (event) {
        if (event.target === eventModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // Update Footer Year
    document.getElementById("footerYear").textContent =
        new Date().getFullYear();

    // Show Events When Page Opens
    displayEvents();

});