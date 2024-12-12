import React from 'react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';

export const UserDisplay: React.FC = () => {
  const { preferences } = useUserPreferences();
  const username = preferences.username?.trim();

  if (!username) {
    return null;
  }

  return (
    <span className="text-sm text-muted-foreground">
      Welcome back, {username}
    </span>
  );
};