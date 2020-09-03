const express = require('express');

const app = express();

app.get('/', (req, res) => {
    //res.send("<h1>Welcome</h1><p>This is my website</p>");
    res.sendfile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    //res.send("<h1>About page</h1><p>This is my website</p>");
    res.sendfile('./views/about.html', { root: __dirname });
});

app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});