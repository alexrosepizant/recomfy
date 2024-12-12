import React from 'react';

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => (
  <section className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
    <div className="border-b border-border bg-muted px-6 py-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </section>
);

export default ProfileSection;