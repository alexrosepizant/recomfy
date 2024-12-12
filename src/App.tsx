import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from './contexts/SearchContext';
import { FilterProvider } from './contexts/FilterContext';
import { ToastProvider } from './contexts/ToastContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { MediaDetailPage } from './components/pages/MediaDetailPage';
import { UserProfilePage } from './components/pages/UserProfilePage';
import { BrowsePage } from './components/pages/BrowsePage';
import { GenreDetailPage } from './components/pages/GenreDetailPage';
import { WatchlistPage } from './components/pages/WatchlistPage';
import { RatedMediaPage } from './components/pages/RatedMediaPage';
import { HistoryPage } from './components/pages/HistoryPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <FilterProvider>
          <ToastProvider>
            <Router>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/browse" element={<BrowsePage />} />
                  <Route path="/browse/:genre" element={<GenreDetailPage />} />
                  <Route path="/movies" element={<CategoryPage type="movie" />} />
                  <Route path="/series" element={<CategoryPage type="series" />} />
                  <Route path="/books" element={<CategoryPage type="book" />} />
                  <Route path="/media/:id" element={<MediaDetailPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/library/watchlist" element={<WatchlistPage />} />
                  <Route path="/library/rated" element={<RatedMediaPage />} />
                  <Route path="/recent/history" element={<HistoryPage />} />
                </Routes>
              </AppLayout>
            </Router>
          </ToastProvider>
        </FilterProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;