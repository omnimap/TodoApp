# Todo App Frontend

A modern, mobile-friendly todo application built with React and TypeScript. This app features a beautiful dark theme, user authentication with Google OAuth support, user-specific todos, and seamless integration with a RESTful backend API. Designed for productivity and ease of use, it supports filtering, sorting, and managing your daily tasks with a clean, responsive interface.

## 🚀 Features

### Core Functionality
- ✨ **Modern UI/UX** - Clean, responsive design with smooth animations and dark theme
- 📝 **CRUD Operations** - Create, read, update, and delete todos
- ✅ **Toggle Completion** - Mark todos as complete/incomplete with visual feedback
- 🔍 **Filter & Sort** - Filter by status (All/Active/Completed) and sort by date or title
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful Design** - Gradient backgrounds, smooth transitions, and modern styling
- ⚡ **Real-time Updates** - Instant UI updates with API integration
- ♿ **Accessibility** - Proper focus management and keyboard navigation

### Authentication & User Management
- 🔐 **User Authentication** - Login with username or Google OAuth
- 👤 **User-Specific Todos** - Each user sees only their own todos
- 🚪 **Session Management** - Persistent login state with localStorage
- 👋 **Personalized Welcome** - Displays username after login
- 🚪 **Logout Functionality** - Secure logout with session cleanup

### Advanced Features
- 🔄 **Modal Interactions** - Floating "+" button opens modal for adding todos
- ✏️ **Inline Editing** - Edit todos directly in the interface
- 📊 **Progress Tracking** - Shows completion statistics (X of Y completed)
- 🎯 **Empty States** - Helpful messages when no todos are available
- 🔄 **Error Handling** - Graceful error handling with retry options

## 🔧 API Integration

This frontend integrates with a REST API running on `localhost:8080`. The API endpoints support user-specific todos:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos?userId={userId}` | Get all todos for a specific user |
| GET | `/api/todos/{id}?userId={userId}` | Get todo by ID for a user |
| POST | `/api/todos` | Create new todo (includes userId in body) |
| PUT | `/api/todos/{id}` | Update todo (includes userId in body) |
| DELETE | `/api/todos/{id}?userId={userId}` | Delete todo for a user |
| PATCH | `/api/todos/{id}/toggle?userId={userId}` | Toggle completion status |

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- The backend API server running on `localhost:8080`
- Google Cloud Console project (for Google OAuth)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ToDoFrontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Google OAuth (Optional):**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000` to Authorized redirect URIs
   - Copy the Client ID

4. **Set up Google OAuth Client ID:**
   - Open `src/index.tsx`
   - Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoList.tsx      # Main todo list component with auth
│   ├── TodoList.css      # Styles for todo list
│   ├── TodoItem.tsx      # Individual todo item component
│   ├── TodoItem.css      # Styles for todo items
│   ├── AddTodo.tsx       # Add new todo component
│   └── AddTodo.css       # Styles for add todo form
├── services/
│   └── todoApi.ts        # API service functions with user support
├── App.tsx               # Main app component with Google OAuth
├── App.css               # App-level styles
├── index.tsx             # App entry point with OAuth provider
└── index.css             # Global styles
```

## 🔐 Authentication Features

### Login Options
1. **Google OAuth Login**: 
   - Click the Google login button
   - Authenticate with your Google account
   - Uses your email as the user ID

2. **Manual Username Login**:
   - Enter any username
   - Stored locally for session persistence

### User-Specific Data
- Each user sees only their own todos
- Todos are filtered by `userId` on both frontend and backend
- Session persists across browser refreshes
- Secure logout clears all user data

## 📊 Features in Detail

### Todo Management
- **Add Todos**: Click the floating "+" button to open a modal for creating new todos
- **Edit Todos**: Click the edit icon to modify todo title and description in a modal
- **Delete Todos**: Click the delete icon to remove todos with confirmation
- **Toggle Completion**: Use the checkbox to mark todos as complete/incomplete

### Filtering & Sorting
- **Filter by Status**: Use the filter buttons (All/Active/Completed) to view specific todos
- **Sort Options**: Sort todos by date (newest first) or alphabetically by title
- **Real-time Filtering**: Instant updates as you change filters

### User Experience
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Displays error messages with retry options
- **Empty States**: Helpful messages when no todos are available for current filter
- **Responsive Design**: Optimized for all screen sizes
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Modal Interactions**: Smooth modal animations for add/edit operations

## 🔧 API Data Structure

The app expects the API to return todo objects with this structure:

```typescript
interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;        // User identifier
  createdAt?: string;
  updatedAt?: string;
}
```

## 🛠️ Technologies Used

- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better development experience
- **Axios** - HTTP client for API calls
- **@react-oauth/google** - Google OAuth integration
- **jwt-decode** - JWT token decoding for Google OAuth
- **@heroicons/react** - Modern icon library
- **CSS3** - Modern styling with gradients and animations
- **Create React App** - Development environment

## 🔧 Backend Requirements

The backend API should support user-specific todos. Here's what the backend needs to implement:

### Required Endpoints
- `GET /api/todos?userId={userId}` - Get todos for specific user
- `POST /api/todos` - Create todo with userId in request body
- `PUT /api/todos/{id}` - Update todo with userId validation
- `DELETE /api/todos/{id}?userId={userId}` - Delete todo for user
- `PATCH /api/todos/{id}/toggle?userId={userId}` - Toggle completion

### Database Schema
```sql
CREATE TABLE todos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  userId VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚨 Troubleshooting

### API Connection Issues
If you see "Failed to load todos" error:
1. Ensure your backend API server is running on `localhost:8080`
2. Check that the API endpoints are accessible
3. Verify CORS is properly configured on the backend
4. Ensure the backend supports user-specific todos

### Google OAuth Issues
If Google login doesn't work:
1. Verify your Google Client ID is correct in `src/index.tsx`
2. Check that `http://localhost:3000` is added to authorized origins
3. Ensure Google+ API is enabled in Google Cloud Console
4. Check browser console for any OAuth errors

### Development Issues
- Clear browser cache if you see stale data
- Check browser console for any JavaScript errors
- Ensure all dependencies are installed with `npm install`
- Restart the development server if changes don't appear

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 🎯 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Todo sharing between users
- [ ] Export todos to CSV/PDF
- [ ] Offline support with service workers
- [ ] Push notifications for reminders
- [ ] Todo templates
- [ ] Bulk operations (select multiple todos)
- [ ] Advanced search functionality
