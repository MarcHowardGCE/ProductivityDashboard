# Productivity Dashboard

This repository contains a modular web application built with React, Tailwind CSS, Node.js, and TypeScript. The application features widgets that can toggle between productivity apps and games, designed for scalability and reusability.

The goal of this application is to provide a Pomodoro-based technique to provide productivity apps while working and game apps while on break. The apps will automatically change when the Pomodoro timer reaches zero.

## Features
- **Multiple Widgets**: Each widget can switch between a productivity app and a game.
- **Dynamic UI Switching**: Toggle between "work mode" and "game mode" with minimal delay.
- **Scalable Architecture**: Easily add more widgets or apps.
- **Smooth User Experience**: Seamless transitions with Framer Motion.

## Getting Started
### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/MarcHowardGCE/ProductivityDashboard
   cd your-repo
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the application**
   ```bash
   npm run dev
   ```
4. **Open in browser**
   Visit `http://localhost:5173` (default Vite port) to view the application.

## Development
### Folder Structure
```
my-app/
├── package.json
├── tsconfig.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.ts
├── README.md
├── index.html
├── public/
├── src/
    ├── main.tsx
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── components/
    │   └── Widget.tsx
    └── widgets/
        ├── WidgetOne/
        │   ├── ToDoList.tsx
        │   ├── MemoryGame.tsx
        │   └── index.tsx
        ├── WidgetTwo/
        |    ├── PomodoroTimer.tsx
        |    ├── TicTacToe.tsx
        |    └── index.tsx
        └── WidgetThree/
            ├── NotesApp.tsx
            ├── SudokuApp.tsx
            └── index.tsx
```

## Usage
### Running the Application
After setting up the project as described in the installation steps, you can run the application using:
```bash
npm run dev
```
This will start the development server, and you can view the application in your browser at `http://localhost:5173`.

### Extending the Application
To extend the application, you can add new widgets or modify existing ones. Follow these steps to add a new widget:

1. **Create a new widget directory**: Inside the widgets directory, create a new folder for your widget (e.g., `WidgetThree`).
2. **Add components**: Create the necessary components for your widget (e.g., `ProductivityComponent.tsx` and `GameComponent.tsx`).
3. **Update the main App component**: Import and render your new widget in the App.tsx file.

### Example
```tsx
// src/App.tsx
import React from 'react';
import WidgetOne from './widgets/WidgetOne';
import WidgetTwo from './widgets/WidgetTwo';
import WidgetThree from './widgets/WidgetThree'; // Import your new widget

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold mb-4">Modular Widget Application</h1>
      <WidgetOne />
      <WidgetTwo />
      <WidgetThree /> {/* Render your new widget */}
    </div>
  );
};

export default App;
```

## Planned Features
- **Additional Widgets**: More productivity tools and games.
- **User Authentication**: Allow users to save their progress and settings.
- **Customization Options**: Enable users to customize the appearance and behavior of widgets.
- **Mobile Support**: Improve responsiveness and usability on mobile devices.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding style and include tests for any new features.

## License
This project is licensed under the MIT License.