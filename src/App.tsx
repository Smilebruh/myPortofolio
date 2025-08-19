import React, { useEffect, useRef } from "react";
import Home from "./Home";
import About from "./About";
import Portofolio from "./Portofolio";
import { sleep } from "./effect.ts";
import { Route, Routes, Link } from "react-router-dom";
const linkId: string[] = ["home", "about", "portofolio"];

function changestyle(
  currentLink: HTMLElement | null,
  anotherLink: (HTMLElement | null)[],
  styleClass: string
): HTMLElement | undefined | null {
  if (!currentLink) return;
  let returnLink: HTMLElement | null = null;
  currentLink.classList.add(styleClass);

  for (const eachlink of anotherLink) {
    if (eachlink?.classList.contains(styleClass)) {
      returnLink = eachlink;
      eachlink.classList.remove(styleClass);
    }
  }

  return returnLink;
}

export default function App(): React.ReactElement {
  const allowToMenu: React.RefObject<boolean> = useRef(true);
  const menuState: React.RefObject<boolean> = useRef(true);
  const menuFunction = async (menu: React.MouseEvent<HTMLDivElement>) => {
    if (!allowToMenu.current) return;

    allowToMenu.current = false;
    const menuAnimationList: string[] = [
      "animate-lineRightDiagonalfor",
      "animate-vanishingLinefor",
      "animate-lineLeftDiagonalfor",
    ];
    const minAnimationList: string[] = [
      "animate-lineRightDiagonalrev",
      "animate-vanishingLinerev",
      "animate-lineLeftDiagonalrev",
    ];

    const lineStyleStart: string[] = [
      "firstThirdLineStart",
      "secondLineStart",
      "firstThirdLineStart",
    ];
    const lineStyleEnd: string[] = [
      "firstLineEnd",
      "secondLineEnd",
      "thirdLineEnd",
    ];

    const currentMenu: HTMLElement = menu.currentTarget;

    if (menuState.current) {
      menuAnimationList.forEach((_, index) => {
        if (
          currentMenu.children[index].classList.contains(
            minAnimationList[index]
          )
        )
          currentMenu.children[index].classList.remove(minAnimationList[index]);

        currentMenu.children[index].classList.remove(lineStyleStart[index]);
      });

      menuAnimationList.forEach((animation, index) =>
        currentMenu.children[index].classList.add(animation)
      );
      
      linkBox.current?.classList.remove('hidden');
      linkBox.current?.classList.add('flex');
      linkBox.current?.classList.add("animate-linkAnimationfor");
      
      await sleep(300);
    
      menuAnimationList.forEach((animation, index) => {
        currentMenu.children[index].classList.remove(animation);
        currentMenu.children[index].classList.add(lineStyleEnd[index]);
      });

      linkBox.current?.classList.remove("animate-linkAnimationfor");
      
    } else {
      minAnimationList.forEach((_, index) => {
        if (
          currentMenu.children[index].classList.contains(
            menuAnimationList[index]
          )
        )
          currentMenu.children[index].classList.remove(
            menuAnimationList[index]
          );
        currentMenu.children[index].classList.remove(lineStyleEnd[index]);
      });

      minAnimationList.forEach((animation, index) =>
        currentMenu.children[index].classList.add(animation)
      );

      linkBox.current?.classList.add("animate-linkAnimationrev");

      await sleep(300);
      minAnimationList.forEach((animation, index) => {
        currentMenu.children[index].classList.remove(animation);
        currentMenu.children[index].classList.add(lineStyleStart[index]);
      });

      linkBox.current?.classList.remove("animate-linkAnimationrev");
      linkBox.current?.classList.add('hidden');
      linkBox.current?.classList.remove('flex')
    }

    allowToMenu.current = true;
    menuState.current = !menuState.current;
  };

  const hasRan: React.RefObject<boolean> = useRef(false);
  const linkBox: React.RefObject<HTMLDivElement | null> = useRef(null);
  const currentPageLink: React.RefObject<HTMLElement | null | undefined> = useRef<HTMLElement | null | undefined>(null);
  const linkRef: (HTMLElement | null)[] = Array(linkId.length).fill(null);

  useEffect(() => {
    if (!hasRan.current) {
      linkId.forEach(
        (ref, index) => (linkRef[index] = document.getElementById(ref))
      ); //assign the link object
      linkRef.forEach((ref) => {
        const anotherLink: (HTMLElement | null)[] = linkRef.filter(
          (element) => element !== ref
        );
        ref?.addEventListener(
          "click",
          () =>
            (currentPageLink.current = changestyle(
              ref,
              anotherLink,
              "currentPage"
            ))
        );
        ref?.addEventListener(
          "mouseover",
          () =>
            (currentPageLink.current = changestyle(
              ref,
              anotherLink,
              "currentPage"
            ))
        );
        ref?.addEventListener("mouseout", () => {
          const anotherLinkBefore: (HTMLElement | null)[] = linkRef.filter(
            (element) => element !== currentPageLink.current
          );
          changestyle(
            currentPageLink.current as HTMLElement | null,
            anotherLinkBefore,
            "currentPage"
          );
        });
      });

      hasRan.current = true;
    }
  });

  return (
    <>
      <div className="flex justify-center lg:bg-[var(--background-color)] bg-[var(--main-color)] text-[var(--lavender-blush)] font-roboto z-[0] min-h-screen min-w-screen">
        <main className="flex flex-col items-center lg:my-6 lg:rounded-[5px] bg-[var(--main-color)] min-w-[95%] min-h-[92%]">
          <nav className="rounded-[5px] flex lg:justify-center justify-end h-[10%] lg:mt-5 w-[97%] items-center">
            <div ref={linkBox} className="lg:flex items-center justify-center lg:w-auto flex w-[85%] lg:h-auto h-[50%] hidden">
              <h1 className="hidden lg:flex text-[30px] font-bold mr-60 text-[#9f5062]">Yuki Suou</h1>
              <Link
                to="/myPortofolio/"
                id="home"
                className="currentPage link"
                draggable={false}
              >
                HOME
              </Link>

              <Link
                to="/myPortofolio/about"
                id="about"
                className="link"
                draggable={false}
              >
                ABOUT
              </Link>

              <Link
                to="/myPortofolio/portofolio"
                id="portofolio"
                className="link"
                draggable={false}
              >
                PORTOFOLIO
              </Link>
            </div>
            <div className="lg:hidden flex justify-end w-[15%] items-center ">
              <div
                className=" flex w-full h-[50%] flex-col items-center gap-2 m-[5%] cursor-pointer justify-center "
                onClick={menuFunction}
              >
                <div className="line firstThirdLineStart ">1</div>
                <div className="line secondLineStart">2</div>
                <div className="line firstThirdLineStart ">3</div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/myPortofolio/" element={<Home />} />
            <Route path="/myPortofolio/about" element={<About />} />
            <Route path="/myPortofolio/portofolio" element={<Portofolio />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
