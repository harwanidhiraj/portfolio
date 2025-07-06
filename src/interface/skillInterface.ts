import type { ReactElement } from "react";

export interface ISkill {
  name: string;
  icon: ReactElement;
}

export interface IExperience {
  title: string;
  company: string;
  duration: string;
  details: string;
}
