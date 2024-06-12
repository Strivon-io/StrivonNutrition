import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";

import { getProfile } from "~services/routes/user.service";

const ProfileContext = createContext<{
  profile?: User;
  clearProfile: () => void;
}>({
  profile: undefined,
  clearProfile: () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<User | null>(null);

  const { isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    setProfile(data);
  }, [data]);

  const clearProfile = () => {
    setProfile(null);
  };

  if (isError) {
    console.error("An error occurred while fetching the profile: ", error);
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
