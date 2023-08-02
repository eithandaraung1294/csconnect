import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const NavConfig = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
  },
  {
    icon: UserCircleIcon,
    name: "blog",
    path: "/blog",
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign In",
    path: "/sign-in",
  },
  {
    icon: UserPlusIcon,
    name: "Sign Up",
    path: "/sign-up",
  },
  {
    icon: DocumentTextIcon,
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
  },
];

export default NavConfig;
