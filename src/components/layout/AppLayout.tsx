import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { LeftMenu } from './LeftMenu';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';
import { RecommendedSection } from '../sections/RecommendedSection';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isBrowsePage = location.pathname.startsWith('/browse');
  const isMediaDetailPage = location.pathname.startsWith('/media/');
  const isLibraryPage = location.pathname.startsWith('/library/');
  const isRecentPage = location.pathname.startsWith('/recent/');
  const { trendingMedia, isLoading } = useDefaultMedia();

  const shouldShowRecommendations = !isProfilePage && 
                                  !isBrowsePage && 
                                  !isMediaDetailPage && 
                                  !isLoading && 
                                  trendingMedia.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Fixed Left Menu */}
        <div className="fixed top-[4rem] left-0 bottom-0 w-64 border-r border-border/50 bg-background z-40">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <LeftMenu />
          </div>
        </div>

        {/* Main Content with left margin to account for fixed menu */}
        <div className="flex-1 ml-64 min-h-[calc(100vh-4rem)]">
          {/* Media Type Filter Bar */}
          {!isProfilePage && !isBrowsePage && !isMediaDetailPage && !isLibraryPage && !isRecentPage && (
            <MediaTypeFilterBar />
          )}

          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};