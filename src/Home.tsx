import React, { useRef, useEffect } from "react";
import { keep_typing, sleep } from "./effect.ts";
import { Link }  from 'react-router-dom';

export default function Home(): React.ReactElement {
  const type_text: React.RefObject<HTMLHeadingElement | null>  = useRef<HTMLHeadingElement | null>(null);
  const medsocRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const allowHover: React.RefObject<Boolean>[] = Array(4).fill(useRef(true)); 
  const hasRan = useRef(false);

  useEffect(() => {
    if (type_text.current && !hasRan.current)  keep_typing(["Hi, you can call me Fiona ", "Glad To Meet You "], 150);
    
    document.title = "Portofolio | Home";

    if (!medsocRef.current || hasRan.current) return;
    for( const [index,link] of Array.from(medsocRef.current.children).entries()){
      link.children[0].addEventListener('mouseover', async thisLink => {
        if(!allowHover[index].current) return;

        const currentTarget = thisLink.currentTarget as HTMLElement;
        currentTarget?.classList.add('animate-roundedIconfor');
        await sleep(500);
        currentTarget?.classList.add('rounded-full');
        currentTarget?.classList.remove('animate-roundedIconfor');

        allowHover[index].current = false;
        console.log('hover in')
      });

      link.children[0].addEventListener('mouseout', async thisLink => {
        const currentTarget = thisLink.currentTarget as HTMLElement;
        currentTarget?.classList.add('animate-roundedIconrev');
        await sleep(500);
        currentTarget?.classList.remove('rounded-full');
        currentTarget?.classList.remove('animate-roundedIconrev');

        allowHover[index].current = true;
        console.log('hover out')
      });

    hasRan.current = true;
    }

  }, []);

  return (
    <>
      <section className="flex flex-col items-center rounded-[5px] w-[97%] lg:h-[80%] lg:mt-5 lg:flex-row lg:justify-start mt-15">
        <div className="flex relative justify-center items-center w-1/2 lg:hidden">
          <img
            src="/myPortofolio/images/KawaiiFiona.webp"
            className="w-3/4 p-1/4 z-[2] rounded-full bg-[var(--bg-fiona)] animate-profileanimation"
          />
        </div>
        <div className="flex text-[var(--lavender-blush)] lg:text-[30px] text-[25px] justify-end items-center h-full lg:w-1/2 w-full animate-textanimation">
          <div className="inline-flex flex-col lg:w-3/4 w-full h-3/4">
            <h1 className="flex justify-center lg:inline">
              <b>ML/AI + Fullstack Engineer</b>
            </h1>
            <div className="flex lg:justify-start justify-center">
              <h1
                ref={type_text}
                id="type_text"
                className="animate-cursorTyping pr-1 h-10 mt-10 font-bold lg:mt-5"
              ></h1>
            </div>
            <p className="text-[17px] lg:mt-5 mt-15 lg:text-left text-center">
              I'm a passionate software engineering student to explore and learn
              new technology. Feel free being my friend.
            </p>
            <div className="flex pt-10 lg:justify-start justify-center">
              <Link
                to="https://mail.google.com/mail/?to=SmileHacking27@gmail.com"
                id="random-button"
                className="flex text-[20px] justify-center items-center rounded-[10px] bg-[var(--black)] w-[150px] h-[50px] cursor-pointer hover:bg-transparent hover:border-white border-[var(--black)] border-2"
              >
                Contact Me
              </Link>
            </div>
            
            <h1 className="flex mb-5 mt-20 lg:ml-2 text-[17px] lg:justify-start justify-center text-[#db7d66]">Follow me for more</h1>
            <div ref={medsocRef} className="lg:ml-2 w-full flex lg:justify-start justify-center items-center gap-4">
              <Link to="https://www.kaggle.com/smilehacking">
                <img
                  src="/myPortofolio/images/189_Kaggle_logo_logos-512.webp"
                  className="w-9 h-full rounded-[5px] bg-[var(--lavender-blush)]"
              
                />
              </Link>
              <Link to="https://github.com/smilebruh/smilebruh" className="flex justify-center items-center">
                <img 
                  src="/myPortofolio/images/github-mark.webp" 
                  className="w-9 h-full bg-[var(--lavender-blush)] rounded-[5px]"
              
                />
              </Link>
              <Link to="https://stackoverflow.com/users/29076795/smilebruh">
                <img 
                  src="/myPortofolio/images/Stack_Overflow_icon.webp" 
                  className="w-9 h-full rounded-[5px]"  
                  
                />
              </Link> 
              <Link to="https://www.instagram.com/dimasalx.sa_/">
                <img 
                  src="/myPortofolio/images/ig.webp" 
                  className="w-9 h-full rounded-[5px]"
            
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex relative justify-center items-center w-1/2">
          <img
            src="/myPortofolio/images/KawaiiFiona.webp"
            className="w-3/4 p-1/4 z-[2] rounded-full bg-[var(--bg-fiona)]"
          />
        </div>
      </section>
    </>
  );
}
