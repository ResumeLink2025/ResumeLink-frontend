export type ProfileType = {
  profile: {
    birthday: string;
    customInterest?: string[];
    customPosition?: string[];
    customSkill?: string[];
    employmentStatus: string;
    experienceYears: number;
    gender?: string;
    id: string;
    imageUrl: string;
    nickname: string;
    summary: string;
    user: {
      desirePositions: {
        position: {
          id: string;
          name: string;
        };
      }[];
      userSkills: {
        skill: {
          id: number;
          name: string;
        };
      }[];
    };
  };
};
