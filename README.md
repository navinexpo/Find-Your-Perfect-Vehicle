# Vehicle Search Application

A modern, responsive React application for searching and filtering vehicles by ZIP code. Built with TypeScript, featuring comprehensive filtering, sorting, and a mobile-first design inspired by Flexcar's inventory interface.

## 🚀 Features

- **ZIP Code Search**: Search for vehicles available in specific ZIP codes
- **Advanced Filtering**: Filter vehicles by make and color
- **Flexible Sorting**: Sort by price (high/low) and year
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Clear error messages for invalid inputs and empty results
- **Loading States**: Smooth loading indicators for better UX
- **Modern UI**: Clean design with animations and hover effects

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Jest** + **React Testing Library** for comprehensive testing
- **CSS-in-JS** with styled-jsx for component-scoped styling
- **ESLint** for code quality

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flex-car-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🧪 Testing

Run the complete test suite:
```bash
npm test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

## 🏗️ Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── VehicleCard.tsx
│   ├── VehicleGrid.tsx
│   ├── FiltersSidebar.tsx
│   ├── SearchForm.tsx
│   └── ErrorMessage.tsx
├── hooks/              # Custom React hooks
│   └── useVehicleSearch.ts
├── types/              # TypeScript type definitions
│   └── vehicle.ts
├── data/               # Mock data and utilities
│   └── vehicles.ts
├── utils/              # Utility functions
│   └── validation.ts
├── constants/          # Application constants
│   └── index.ts
├── __tests__/          # Test files
│   ├── App.test.tsx
│   ├── useVehicleSearch.test.ts
│   ├── validation.test.ts
│   └── VehicleCard.test.tsx
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── setupTests.ts       # Test configuration
```

## 🎯 Available ZIP Codes

The application includes sample data for the following ZIP codes:

- **10001** (New York) - 5 vehicles including Tesla, BMW, Audi, Mercedes-Benz, Toyota
- **90210** (Beverly Hills) - 3 luxury vehicles including Porsche, Lamborghini, Ferrari
- **60601** (Chicago) - 4 vehicles including Ford, Chevrolet, Honda, Nissan
- **33101** (Miami) - 3 exotic vehicles including McLaren, Bentley, Rolls-Royce

## ✨ Key Features Implementation

### 1. ZIP Code Validation
- Accepts 5-digit ZIP codes (12345)
- Supports ZIP+4 format (12345-6789)
- Real-time validation with clear error messages

### 2. Vehicle Filtering
- **Make Filter**: Filter by vehicle manufacturer
- **Color Filter**: Filter by vehicle color
- **Combined Filtering**: Multiple filters work together
- **Clear Filters**: Easy reset option

### 3. Sorting Options
- **Price: High to Low** (default)
- **Price: Low to High**
- **Year (Newest First)**

### 4. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layout for medium screens
- **Desktop**: Full-featured sidebar layout
- **Touch-Friendly**: Large touch targets for mobile users

### 5. Error Handling
- Invalid ZIP code format
- Empty ZIP code input
- No vehicles found for ZIP code
- Graceful error recovery

## 🔧 Design Decisions

### Component Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Custom Hooks**: Business logic extracted into reusable hooks
- **TypeScript**: Full type safety throughout the application
- **CSS-in-JS**: Component-scoped styling for better maintainability

### State Management
- **React Hooks**: useState and custom hooks for state management
- **Derived State**: Filtering and sorting computed from base state
- **Minimal Re-renders**: Optimized with useMemo and useCallback

### Testing Strategy
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Full user flow testing
- **Coverage**: High test coverage for critical paths
- **User-Centric**: Tests focus on user interactions and outcomes

### Performance Optimizations
- **Lazy Loading**: Components loaded as needed
- **Memoization**: Expensive calculations cached
- **Optimized Images**: Placeholder fallbacks for broken images
- **Smooth Animations**: CSS transitions for better UX

## 🎨 Design System

### Color Palette
- **Primary**: #101357 (Deep Navy)
- **Secondary**: #4f80ff (Bright Blue)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)
- **Background**: #f8fafc (Light Gray)

### Typography
- **Font Family**: System fonts for optimal performance
- **Scale**: Consistent type scale throughout the application
- **Weight**: Strategic use of font weights for hierarchy

## 🚀 Future Enhancements

- **Advanced Filters**: Price range, mileage range, year range
- **Favorites**: Save preferred vehicles
- **Comparison**: Side-by-side vehicle comparison
- **Map Integration**: Show vehicle locations on a map
- **Real API Integration**: Connect to actual vehicle inventory APIs
- **User Authentication**: Personalized experience
- **Vehicle Details**: Expanded detail pages with more photos and specs

## 📄 Assignment Compliance

This application fully meets all requirements specified in the take-home assignment:

✅ **ZIP Code Search** - Complete with validation and error handling  
✅ **Vehicle Details** - All required fields displayed (Make, Model, Trim, Year, Color, Mileage, Price, Image)  
✅ **Filtering** - Make and Color filters implemented  
✅ **Sorting** - Price (high/low) and Year sorting  
✅ **Responsive UI** - Works across all device sizes  
✅ **Theme Color** - #101357 used throughout  
✅ **Left Sidebar** - Filters positioned on left side  
✅ **Error Handling** - Comprehensive error messages  
✅ **TypeScript** - Fully implemented with strict typing  
✅ **Unit Testing** - Comprehensive test suite included  
✅ **Clean Code** - No errors, warnings, or console logs  

## 👤 Contact

If you have any questions about this implementation, please feel free to reach out!

---

**Last Updated**: September 2025  
**Version**: 1.0.0