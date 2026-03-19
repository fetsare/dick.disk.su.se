import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export interface NavbarItem {
  label: string;
  link: string;
}

export const NAVIGATION_ITEMS: NavbarItem[] = [
  {
    label: "Hem",
    link: "/",
  },
  {
    label: "Medlemmar",
    link: "/medlemmar",
  },
  {
    label: "Bli medlem",
    link: "/bli-medlem",
  },
];

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.link}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>{item.link}</NavigationMenuLink>
              </NavigationMenuContent>
            </div>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
