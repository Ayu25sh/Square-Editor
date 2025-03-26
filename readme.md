# Square Editor

## Overview
Square Editor is a responsive web application built with **Vue + TypeScript + React** that allows users to dynamically customize a square's properties across different screen widths. The application features a draggable frame, a control panel for real-time customization, and breakpoint-specific behavior.

## 🚀 Live Demo
🔗 [Square Editor Live](https://square-editor.vercel.app/)  

## Features
### 1. Core Components
#### **The Frame**
- Contains a square that updates based on user inputs.
- Frame width is adjustable via dragging (horizontal resize).
- The frame adapts to three distinct width breakpoints (small, medium, large).

#### **Control Panel**
- Provides input fields to modify square properties.
- Includes a **color picker** for changing the square's color.
- Allows control over **side length** using a numeric input or slider.
- Dynamically displays only relevant inputs for the current breakpoint.
- Provides a dropdown selector to manually switch between breakpoints (`sm`, `md`, `lg`).

### 2. Responsive Behavior
- Three width ranges are defined:
  - **Small (sm):** `320-640px`
  - **Medium (md):** `641-1024px`
  - **Large (lg):** `1025px+`
- The application ensures smooth transitions when resizing.

### 3. Property Inheritance
- If a property (color or size) is **not specified** for the current breakpoint, it inherits from the next larger breakpoint.
- The inheritance cascade follows: **lg → md → sm**.

### 4. Dynamic Updates
The square updates in real-time when:
1. **Modifying properties** via the control panel.
2. **Resizing the frame** width (crossing breakpoints).
3. **Switching breakpoints** using the dropdown selector.

## Installation & Setup
### Prerequisites
- **Node.js** (v16+ recommended)
- **Package Manager**: npm / yarn / pnpm

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Ayu25sh/Square-Editor.git
   cd Square-Editor
   ```
2. **Install dependencies:**
   ```sh
   npm install  # or yarn install
   ```
3. **Run the development server:**
   ```sh
   npm run dev  # or yarn dev
   ```
4. **Open the app in your browser:**
   ```
   http://localhost:5173  # Vite default port
   ```

## Technologies Used
- **Vue 3** (Composition API + TypeScript)
- **React** (for UI Components)
- **TypeScript** (Static typing & maintainability)
- **Vite** (Fast development server)
- **Tailwind CSS** (Styling & responsive design)

## License
This project is licensed under the [MIT License](LICENSE).

## Contributing
Feel free to submit issues or pull requests! 🚀
