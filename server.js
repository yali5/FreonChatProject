const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (your JS, HTML, CSS, images, etc.)
app.use(express.static(__dirname));

// Use index.html as the homepage if it exists.
// If you want page.js to run as the homepage, you will need a wrapper HTML file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example API endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
