import { ROUTES } from "../enums/routes";
import type { INavLink } from "../interface/homeInterface";

export const navLinks: INavLink[] = [
  { name: "Home", path: ROUTES.HOME },
  { name: "About", path: ROUTES.ABOUT },
  { name: "Projects", path: ROUTES.PROJECTS },
  { name: "Contact", path: ROUTES.CONTACT },
];
