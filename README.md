# EnergyLink

A modern peer-to-peer energy trading platform that connects neighbors to buy and sell solar energy directly, creating sustainable communities and better energy economics.

## 🌟 Features

### Core Functionality
- **Peer-to-Peer Energy Trading**: Connect with neighbors to buy and sell solar energy directly
- **Auto-Trade System**: Intelligent matching algorithm that automatically finds compatible trading partners
- **Real-Time Dashboard**: Live K-line candlestick charts showing energy price movements
- **Community Visualization**: Interactive neighborhood map showing energy participation with house icons, trees, and solar panels
- **Dynamic Pricing**: Real-time price updates with smooth animations every 2 seconds

### User Experience
- **Modern Dark Theme**: Professional energy trading interface with neon green accents
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Engaging transitions and real-time visual feedback
- **Interactive Tooltips**: Detailed neighbor statistics on hover
- **Live Updates**: Real-time data updates throughout the platform

### Trading Features
- **Role-Based Trading**: Switch between seller and buyer modes
- **Price Band Configuration**: Set minimum/maximum prices and daily limits
- **Transaction History**: Detailed receipts and trade tracking
- **CO₂ Impact Tracking**: Monitor environmental impact of energy trading
- **Community Leaderboards**: See top energy contributors in your neighborhood

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EnergyLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
src/
├── components/
│   ├── design-system/     # Reusable UI components
│   ├── figma/            # Figma integration components
│   ├── layout/           # Navigation and layout components
│   ├── screens/          # Main application screens
│   ├── stock/            # Trading and chart components
│   └── ui/               # Base UI components
├── styles/               # Global styles and CSS variables
└── main.tsx             # Application entry point
```

## 🎨 Design System

EnergyLink uses a custom design system with:
- **Dark Theme**: Deep charcoal backgrounds with neon green accents
- **Color Palette**: 
  - Primary: `#00FF88` (neon green)
  - Secondary: `#00E676` (energy green)
  - Background: `#0B0F14` to `#121820` gradient
- **Typography**: Modern, clean fonts with proper hierarchy
- **Animations**: Smooth transitions and real-time visual feedback

## 🔧 Key Components

### Trading Dashboard
- **Candlestick Chart**: Professional K-line chart with real-time updates
- **Price Panels**: Current price display with change indicators
- **Auto-Trade Toggle**: Enable/disable automatic trading
- **KPI Metrics**: Energy bought/sold, savings, and capacity tracking

### Community Features
- **Neighborhood Map**: Visual representation of energy participation
- **House Icons**: Each neighbor represented by a house with trees and solar panels
- **Activity Levels**: Visual indicators based on energy contribution
- **Leaderboards**: Top contributors and community achievements

### Authentication
- **Modern Login Popup**: Centered overlay with smooth animations
- **Email Integration**: Dynamic user display with email addresses
- **Role Management**: Seller and buyer role switching

## 🌱 Environmental Impact

EnergyLink promotes sustainable energy practices by:
- **Reducing Transmission Losses**: Local energy trading minimizes grid transmission
- **Supporting Renewable Energy**: Encourages solar panel adoption
- **CO₂ Tracking**: Real-time environmental impact monitoring
- **Community Building**: Strengthens local energy resilience

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom CSS variables
- **Charts**: Custom SVG-based candlestick charts
- **Icons**: Lucide React icon library
- **State Management**: React hooks and context

## 📱 Browser Support

EnergyLink supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

We welcome contributions to EnergyLink! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@energylink.com
- Documentation: Check the inline component documentation
- Issues: Use GitHub issues for bug reports and feature requests

---

**EnergyLink** - Building sustainable communities through peer-to-peer energy trading.