# Todo App Frontend

A modern, mobile-friendly todo application built with React and TypeScript. This app features a beautiful dark theme, a floating add button, modal popups for adding and editing todos, and seamless integration with a RESTful backend API. Designed for productivity and ease of use, it supports filtering, sorting, and managing your daily tasks with a clean, responsive interface.

## Features

- ✨ **Modern UI/UX** - Clean, responsive design with smooth animations
- 📝 **CRUD Operations** - Create, read, update, and delete todos
- ✅ **Toggle Completion** - Mark todos as complete/incomplete
- 🔍 **Filter & Sort** - Filter by status (All/Active/Completed) and sort by date or title
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful Design** - Gradient backgrounds, smooth transitions, and modern styling
- ⚡ **Real-time Updates** - Instant UI updates with API integration
- ♿ **Accessibility** - Proper focus management and keyboard navigation

## API Integration

This frontend integrates with a REST API running on `localhost:8080`. The API endpoints are:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |
| GET | `/api/todos/completed/{boolean}` | Get todos by completion status |
| PATCH | `/api/todos/{id}/toggle` | Toggle completion status |

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- The backend API server running on `localhost:8080`

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ToDoFrontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── TodoList.tsx      # Main todo list component
│   ├── TodoList.css      # Styles for todo list
│   ├── TodoItem.tsx      # Individual todo item component
│   ├── TodoItem.css      # Styles for todo items
│   ├── AddTodo.tsx       # Add new todo component
│   └── AddTodo.css       # Styles for add todo form
├── services/
│   └── todoApi.ts        # API service functions
├── App.tsx               # Main app component
├── App.css               # App-level styles
├── index.tsx             # App entry point
└── index.css             # Global styles
```

## Features in Detail

### Todo Management
- **Add Todos**: Click the "+" floating button to create new todos
- **Edit Todos**: Click the edit icon to modify todo title and description
- **Delete Todos**: Click the delete icon to remove todos
- **Toggle Completion**: Use the checkbox to mark todos as complete/incomplete

### Filtering & Sorting
- **Filter by Status**: Use the filter buttons (All/Active/Completed) to view specific todos
- **Sort Options**: Sort todos by date (newest first) or alphabetically by title

### User Experience
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Displays error messages with retry options
- **Empty States**: Helpful messages when no todos are available
- **Responsive Design**: Optimized for all screen sizes
- **Keyboard Navigation**: Full keyboard support for accessibility

## API Data Structure

The app expects the API to return todo objects with this structure:

```typescript
interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations
- **Create React App** - Development environment

## Troubleshooting

### API Connection Issues
If you see "Failed to load todos" error:
1. Ensure your backend API server is running on `localhost:8080`
2. Check that the API endpoints are accessible
3. Verify CORS is properly configured on the backend

### Development Issues
- Clear browser cache if you see stale data
- Check browser console for any JavaScript errors
- Ensure all dependencies are installed with `npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
