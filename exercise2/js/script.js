// Select necessary DOM elements
const tabsContainer = document.querySelector('.tabs');
const tabContentContainer = document.querySelector('.tab-content');

// Function to create tabs and their corresponding content
function createTabs(jsonData) {
  // Iterate over each object in the JSON array
  jsonData.forEach((item, index) => {
    // Create tab button
    const tabButton = document.createElement('a');
    tabButton.textContent = item.title;
    tabButton.classList.add('tab-button');
    tabButton.dataset.index = index; // Store index for referencing content

    // Create tab mobile content
    const tabContentmobile = document.createElement('div');
    tabContentmobile.classList.add('tab-mobile-content');
    tabContentmobile.innerHTML = item.content;

    // Create tab content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab');
    tabContent.innerHTML = item.content;

    // Append tab button and content to respective containers
    tabsContainer.appendChild(tabButton);
    tabsContainer.appendChild(tabContentmobile);
    tabContentContainer.appendChild(tabContent);

    // Add event listener to handle tab switching
    tabButton.addEventListener('click', () => {
      // Remove 'clicked' class from all tab buttons
      const allTabButtons = document.querySelectorAll('.tab-button');
      allTabButtons.forEach(btn => btn.classList.remove('clicked'));
      
      const contentMobile = document.querySelectorAll('.tab-mobile-content');
      contentMobile.forEach(content => content.classList.remove('active'));

      // Add 'clicked' class to the clicked tab button
      tabButton.classList.add('clicked');
      tabButton.nextElementSibling.classList.add('active');
      

      // Hide all tabs
      const allTabs = document.querySelectorAll('.tab');
      allTabs.forEach(tab => tab.style.height = '0');
      allTabs.forEach(tab => tab.style.opacity = '0');

      // Show the clicked tab content
      // tabContent.style.display = 'block';
      tabContent.style.opacity = '100%';
      tabContent.style.height = '100%';
    });
  });

  // Show the first tab by default
  const firstTabContent = document.querySelector('.tab');
  if (firstTabContent) {
    // firstTabContent.style.display = 'block';
    firstTabContent.style.opacity = '1';
    firstTabContent.style.height = '100%';
    // Add 'clicked' class to the first tab button by default
    const firstTabButton = document.querySelector('.tab-button');
    if (firstTabButton) {
      firstTabButton.classList.add('clicked');
    }
  }
}

// Function to fetch JSON data from file
async function fetchData() {
  try {
    const response = await fetch('js/data.json'); // Fetch JSON file
    const jsonData = await response.json();   // Parse JSON response
    createTabs(jsonData);                     // Call function to create tabs
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call fetchData function to initiate fetching and processing of JSON data
fetchData();

function accordionCheckDesktop() {
  const mobileTabContents = document.querySelectorAll('.tab-mobile-content');
  mobileTabContents.forEach(content => content.classList.remove('active'));
}

function accordionCheck() {
  // Select all tab buttons and contents
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-mobile-content');

  // Remove 'clicked' class from all tab buttons
  tabButtons.forEach(btn => btn.classList.remove('clicked'));

  // Remove 'active' class from all tab contents
  tabContents.forEach(content => content.classList.remove('active'));

  // Add 'clicked' class to the first tab button
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add('clicked');
  }

  // Add 'active' class to the first tab content
  if (tabContents.length > 0) {
    tabContents[0].classList.add('active');
  }
}

function addClassToFirstTabContent() {
  setTimeout(function() {
    // Select the first tab content element
    const firstTabContent = document.querySelector('.tab-mobile-content');

    // Add your desired class to the first tab content element
    if (firstTabContent) {
      firstTabContent.classList.add('active'); // Replace 'new-class' with your desired class name
    }
  }, 200); // Adjust the delay in milliseconds (e.g., 1000 milliseconds = 1 second)
}

// Check window width on initial load and resize
function handleWindowSizeChange() {
  if (window.innerWidth < 650) {
    accordionCheck(); // Call accordionCheck function
    addClassToFirstTabContent();
  } else {
    accordionCheckDesktop();
  }
}


// Initial check on page load
handleWindowSizeChange();

// Listen for window resize events
window.addEventListener('resize', handleWindowSizeChange);