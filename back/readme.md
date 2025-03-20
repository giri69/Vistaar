## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info

### Founders
- `GET /api/founders/profile` - Get founder profile
- `PUT /api/founders/profile` - Update founder profile
- `POST /api/founders/startups/apply` - Submit a new startup application

### Investors
- `GET /api/investors/profile` - Get investor profile
- `PUT /api/investors/profile` - Update investor profile
- `GET /api/investors/startups/available` - Get available startups for investment
- `POST /api/investors/startups/:startupId/interest` - Express interest in a startup

### Admin
- `GET /api/admin/startups` - Get all startups
- `PUT /api/admin/startups/:id/review` - Review a startup application
- `GET /api/admin/analytics` - Get platform analytics
