require('dotenv').config();
const express = require('express');
const gadgetRoutes = require('./routes/gadgets');
const { generateToken, authenticateToken  } = require("./middleware/auth")

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the IMF Gadget API');
});

app.get('/login',generateToken);
app.use('/gadgets', authenticateToken, gadgetRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
