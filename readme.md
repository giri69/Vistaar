# Vistaar - Startup Growth & Investment Platform

## Overview

Vistaar is an innovative community platform designed to connect founders with investors, removing barriers in the startup ecosystem. Many promising ideas fail due to a lack of funding, mentorship, and connections. Vistaar addresses this by creating a seamless ecosystem where entrepreneurs can exchange equity for the resources they need, while investors gain access to vetted early-stage opportunities.

## Key Features

- **Startup Onboarding & Paperwork Handling**
  - Founders submit applications detailing their idea and needs
  - Platform handles all legal paperwork and company registration
  - 2% equity allocation to the platform ensures long-term commitment

- **Open Investment Model**
  - Anyone can become an investor (not just VCs or angels)
  - Industry experts, professionals, and mentors can invest expertise and connections
  - Basic eligibility criteria including credit score (CIBIL) verification

- **Secure & Hassle-Free Investment Process**
  - Platform manages official paperwork and retains 2% equity
  - Vetted startups ensure quality and trust
  - Structured support in the early stages

## Tech Stack

### Frontend
- React.js
- Vite (build tool)

### Backend
- Node.js
- Express.js
- MongoDB

## Project Structure

```
.
├── back/                  # Backend code
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Auth and role middleware
│   ├── routes/            # API route definitions
│   └── utils/             # Helper functions
│
├── front/                 # Frontend code
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable UI components
│       │   ├── admin/     # Admin-specific components
│       │   ├── auth/      # Authentication components
│       │   ├── common/    # Shared components
│       │   ├── founder/   # Founder-specific components
│       │   ├── home/      # Homepage components
│       │   └── investor/  # Investor-specific components
│       ├── pages/         # Page components
│       └── App.jsx        # Main application component
```

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/vistaar.git
   cd vistaar
   ```

2. Install backend dependencies
   ```
   cd back
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../front
   npm install
   ```

4. Create a `.env` file in the `back` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vistaar
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

### Running the Application

1. Start the backend server
   ```
   cd back
   node index.js
   ```

2. Start the frontend development server
   ```
   cd front
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## User Roles

1. **Founders**
   - Submit startup applications
   - Manage paperwork and equity distribution
   - Connect with potential investors

2. **Investors**
   - Browse vetted startups
   - Express interest and make investment offers
   - Track investments and returns

3. **Administrators**
   - Review and approve startup applications
   - Verify investor credentials
   - Manage platform operations

