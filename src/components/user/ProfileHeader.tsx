import React from 'react';

interface ProfileHeaderProps {
  title: string;
  description: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, description }) => (
  <div>
    <h1 className="text-4xl font-bold text-foreground">{title}</h1>
    <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{description}</p>
  </div>
);

export default ProfileHeader;