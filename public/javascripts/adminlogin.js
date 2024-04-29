// admin login handler here
// link it to '/admin/login.ejs' view
// done using JSON web token
const jwt = require('jsonwebtoken');

// Admin login handler
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Dummy authentication logic (replace with your actual authentication logic)
    const user = users.find(user => user.username === username && user.password === password && user.role === 'admin');
    if (user) {
        // Generate JWT token
        const token = jwt.sign({ username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Example protected route
app.get('/admin/dashboard', (req, res) => {
    const token = req.headers.authorization; // Assuming token is sent in the Authorization header
    if (token) {
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else if (decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            } else {
                // Token is valid, proceed to admin dashboard
                res.status(200).json({ message: 'Welcome to admin dashboard', username: decoded.username });
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
});
