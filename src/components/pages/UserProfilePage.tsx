import React from 'react';
import { Settings } from 'lucide-react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { UserPreferencesForm } from '../user/UserPreferencesForm';
import { UserStats } from '../user/UserStats';
import ProfileSection from '../user/ProfileSection';
import ProfileHeader from '../user/ProfileHeader';
import { cn } from '../../utils/cn';

export const UserProfilePage: React.FC = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  
  return (
    <div className="w-full min-h-[calc(100vh-4rem)]">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <ProfileHeader 
            title="Your Profile"
            description="Manage your preferences and personalize your experience"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileSection title="Profile Settings" icon={<Settings className="w-5 h-5 text-primary" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={preferences.username || ''}
                    onChange={(e) => updatePreferences({ username: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 rounded-md",
                      "bg-muted border border-border",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      "transition-colors"
                    )}
                    placeholder="Enter your username"
                  />
                </div>
              </div>
            </ProfileSection>

            <ProfileSection title="Preferences" icon={<Settings className="w-5 h-5 text-primary" />}>
              <UserPreferencesForm />
            </ProfileSection>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <UserStats />
          </div>
        </div>
      </div>
    </div>
  );
};