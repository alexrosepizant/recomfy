# recomfy

A modern web application for discovering and tracking movies, TV shows, and books with personalized recommendations.

## Features

- 🎬 Browse movies, TV shows, and books in one place
- 🎯 Get personalized recommendations based on your preferences
- 📚 Track your watchlist and reading list
- ⭐ Rate and review content
- 📱 Responsive design for all devices
- 🎨 Beautiful, modern UI with dark mode
- 🔍 Advanced search and filtering
- 📊 View your watching/reading history and stats

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Routing**: React Router
- **API Integration**: Axios
- **Machine Learning**: brain.js for recommendations
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recomfy.git
cd recomfy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GOODREADS_API_KEY=your_goodreads_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | API key for The Movie Database (TMDB) |
| `VITE_GOODREADS_API_KEY` | API key for Goodreads |

## Project Structure

```
src/
├── components/        # React components
│   ├── browse/       # Browse-related components
│   ├── filters/      # Filter components
│   ├── layout/       # Layout components
│   ├── media/        # Media-related components
│   ├── search/       # Search components
│   └── ui/           # Reusable UI components
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── services/         # API and service integrations
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Best Practices

- **Component Organization**: Components are organized by feature/domain
- **Type Safety**: TypeScript is used throughout the project
- **Code Splitting**: Components and utilities are modular
- **State Management**: Context API for global state
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized with lazy loading and memoization
- **Accessibility**: ARIA labels and semantic HTML
- **Testing**: Unit tests for critical functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie and TV show data
- [Google Books API](https://developers.google.com/books) for book data
- [brain.js](https://brain.js.org/) for machine learning capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons