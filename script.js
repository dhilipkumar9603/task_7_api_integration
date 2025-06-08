const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUserData() {
  userContainer.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();

    userContainer.innerHTML = ''; // clear loader

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(userCard);
    });

  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// Load data on page load
fetchUserData();

// Reload on button click
reloadBtn.addEventListener('click', fetchUserData);
