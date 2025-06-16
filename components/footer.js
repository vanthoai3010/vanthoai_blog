import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";
import Image from "next/image";
import { myLoader } from "@/utils/all";
import VercelLogo from "../public/img/vercel.svg";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        <span>

          Made by Tớ
        </span>
        <span>&middot;</span>
        <span>
          {" "}
          <a
            href="https://github.com/vanthoai3010"
            rel="noopener"
            target="_blank">
            Github
          </a>
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-600">
            🐧🐧🐧
          </span>
        </div>
        <ThemeSwitch />
      </div>
    </Container>
  );
}

