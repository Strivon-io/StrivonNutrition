type User = {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  gender: string;
  height: string;
  weight: string;
  birthday: string;
  goal: string;
  activityLevel: string;
  kcalNeeds: string;
  groceryList: string[];
  recipes: string[];
  scheduledRecipe: string[];
  createdAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
};

type CreateUser = {
  username: string;
  email: string;
  password: string;
  gender: string;
  size: string;
  weight: string;
  birthdayDate: Date;
  goal: string;
  activityLevel: string;
};
