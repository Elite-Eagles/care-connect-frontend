"use client"

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { PrimaryButton } from "../ui/buttons";
import { UserState } from "../userContext";
import Image from "next/image";
import Link from "next/link";


export default function NavBar() {
  const user = UserState()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={'/logo.svg'} width={200} height={50} alt=""></Image>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={user?.isauth ? "/" : "/landing"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/disasters">
            Disasters
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href={user?.isauth ? "/help/needed/" : "/auth"}><PrimaryButton text="I need help" className="bg-[#00ffb33c] text-[#009b7c]" /></Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

