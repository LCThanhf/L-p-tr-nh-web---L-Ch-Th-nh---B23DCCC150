const express = require('express');
const app = express();  
const port = 3000;

app.use(express.json());    

app.listen(port, () => {    
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ]);
});