# BugBridge - Security Bug Bounty Platform

A modern, responsive React frontend for connecting companies with anonymous bug hunters for responsible security disclosure.

## Features

- **Dark Mode Theme**: Modern, clean design with dark colors and gradient accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **User Authentication**: Separate login/registration for companies and bug hunters
- **Company Dashboard**: Post bounties, manage bug reports, track rewards
- **Hunter Dashboard**: Browse bounties, submit bug reports with attachments
- **Real-time Notifications**: Success/error messages for user actions
- **Severity Badges**: Color-coded severity levels (Low/Medium/High)
- **File Attachments**: Support for uploading proof-of-concept files

## Tech Stack

- **React 18** with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Context API** for state management
- **Mock Data** for demonstration purposes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bugbridge-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Modal.js        # Reusable modal component
│   ├── Notification.js # Toast notifications
│   ├── SeverityBadge.js # Severity level badges
│   ├── BountyModal.js  # Bounty submission modal
│   └── BugReportModal.js # Bug report submission modal
├── pages/              # Main page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── CompanyDashboard.js # Company dashboard
│   └── HunterDashboard.js  # Hunter dashboard
├── context/            # React Context for state management
│   └── AppContext.js   # Global app state
├── data/               # Mock data
│   └── mockData.js     # Sample bounties and reports
├── App.js              # Main app component with routing
└── index.js            # App entry point
```

## Usage

### For Companies
1. Register as a company
2. Access the company dashboard
3. Post new bug bounties with rewards and deadlines
4. Review and manage submitted bug reports
5. Track bounty status and payouts

### For Bug Hunters
1. Register as a bug hunter
2. Browse available bounties
3. Submit detailed bug reports with attachments
4. Track report status and earnings
5. View accepted reports and rewards

## Customization

### Styling
The app uses Tailwind CSS with custom color scheme defined in `tailwind.config.js`:
- Dark background: `#0f0f23`
- Card background: `#1a1a2e`
- Accent colors: Blue (`#3b82f6`) and Purple (`#8b5cf6`)

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update routing in `App.js`
4. Add new state actions in `AppContext.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo

The app includes mock data for demonstration purposes. You can:
- Register as either a company or bug hunter
- Post sample bounties
- Submit bug reports
- See notifications and status updates

All data is stored in memory and will reset when the page is refreshed.
