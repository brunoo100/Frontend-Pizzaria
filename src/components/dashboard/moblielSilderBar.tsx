"use client";

import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  Tags,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { LogoutAction } from "@/actions/auth";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const menuItem = [
  {
    title: "Pedidos",
    href: "/dashboard",
    icon: ShoppingCart,
  },
  {
    title: "Produtos",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categorias",
    href: "/dashboard/categories",
    icon: Tags,
  },
];

export function MoblSidebar() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 border-b border-app-border bg-app-card">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet>
            {/* BOTÃO DE ABRIR */}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            {/* CONTEÚDO */}
            <SheetContent
              side="left"
              className="w-72 p-0 bg-app-sidebar border-app-border"
            >
              <SheetHeader className="border-b p-6 border-app-border">
                <SheetTitle className="text-xl text-white font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* MENU */}
              <nav className="flex flex-col p-4 space-y-4">
                {menuItem.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = pathname === menu.href;

                  return (
                    <SheetClose asChild key={menu.title}>
                      <Link
                        href={menu.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-colors duration-300 text-white",
                          isActive
                            ? "bg-brand-primary"
                            : "hover:bg-gray-600"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {menu.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* LOGOUT */}
              <div className="absolute bottom-0 w-full border-t border-app-border p-4">
                <SheetClose asChild>
                  <form action={LogoutAction}>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="w-full justify-start gap-3 text-white hover:text-white hover:bg-transparent"
                    >
                      <LogOut className="w-5 h-5" />
                      Sair
                    </Button>
                  </form>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* LOGO */}
          <h1 className="text-lg font-bold">
            Sujeito<span className="text-brand-primary">Pizza</span>
          </h1>

          {/* ESPAÇADOR */}
          <div className="w-10" />
        </div>
      </header>
    </div>
  );
}
