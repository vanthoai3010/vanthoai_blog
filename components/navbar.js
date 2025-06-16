"use client";

import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import cx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { myLoader } from "@/utils/all";

export default function Navbar(props) {
  const leftmenu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about",
      badge: "ℹ️"
    },
    {
      label: "Contact",
      href: "/contact",
      badge: "📧"
    }
  ];

  const rightmenu = [
    {
      label: "Archive",
      href: "/archive"
    },
    {
      label: "GitHub",
      href: "https://github.com/vanthoai3010",
      external: true,
      badge: "🐧"
    },
    {
      label: "Download",
      href: "https://github.com/vanthoai3010",
      external: true,
      badge: "📥"
    }
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav className="border-b-2 border-gray-200 bg-black shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-nowrap">
                {/* Logo */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-white dark:text-white">Van Thoai</span>
                  </Link>
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-all">
                    {open ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden flex-1 items-center justify-center space-x-6 md:flex">
                  {leftmenu.map((item, index) =>
                    item.children?.length ? (
                      <DropdownMenu key={index} menu={item} items={item.children} />
                    ) : (
                      <Link
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                        className="text-sm text-white font-medium text-white hover:text-yellow-500 transition duration-200 hover:underline decoration-yellow-500 decoration-2 underline-offset-4 dark:text-gray-300 dark:hover:text-yellow-500 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>

                {/* Right Menu */}
                <div className="hidden items-center space-x-6 md:flex">
                  {rightmenu.map((item, index) =>
                    item.children?.length ? (
                      <DropdownMenu key={index} menu={item} items={item.children} />
                    ) : (
                      <Link
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                        className="relative text-sm font-medium text-white hover:text-yellow-500 transition duration-200 hover:underline decoration-yellow-500 decoration-2 underline-offset-4 dark:text-gray-300 dark:hover:text-yellow-500 transition-all"
                      >
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-100 dark:text-blue-800">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Mobile Menu Panel */}
              <Disclosure.Panel className="md:hidden px-4 pb-4">
                <div className="space-y-2">
                  {mobilemenu.map((item, index) =>
                    item.children?.length ? (
                      <DropdownMenu key={index} menu={item} items={item.children} mobile />
                    ) : (
                      <Link
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}
                        className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-all"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

const DropdownMenu = ({ menu, items, mobile }) => {
  return (
    <Menu
      as="div"
      className={cx("relative text-left", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-1 rounded-md px-5 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : " text-gray-600 dark:text-gray-400 ",
              mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
            )}>
            <span>{menu.label}</span>
            <ChevronDownIcon className="mt-0.5 h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="lg:transition lg:ease-out lg:duration-100"
            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
            enterTo="lg:transform lg:opacity-100 lg:scale-100"
            leave="lg:transition lg:ease-in lg:duration-75"
            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
            <Menu.Items
              className={cx(
                "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                !mobile && "bg-white shadow-lg  dark:bg-gray-800"
              )}>
              <div className={cx(!mobile && "py-3")}>
                {items.map((item, index) => (
                  <Menu.Item as="div" key={`${item.title}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item?.path ? item.path : "#"}
                        className={cx(
                          "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                          active
                            ? "text-blue-500"
                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                        )}>
                        <span> {item.title}</span>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
