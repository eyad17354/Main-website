const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// POST endpoint to save location
app.post('/location', (req, res) => {
    const { latitude, longitude, timestamp } = req.body;
    
    // Create location entry
    const locationEntry = `${timestamp} - Latitude: ${latitude}, Longitude: ${longitude}\n`;
    
    // Append to locations.txt
    fs.appendFile('locations.txt', locationEntry, (err) => {
        if (err) {
            console.error('Error saving location:', err);
            return res.status(500).json({ error: 'Failed to save location' });
        }
        res.json({ message: 'Location saved successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 