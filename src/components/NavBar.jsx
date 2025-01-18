import React, { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button.jsx';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const NavBar = () => {

    const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
    const navConRef = useRef(null);
    const audioElement = useRef(null); 
    const [isAudioPlaying, setAudioPlaying] = useState(false);
    const [isIndicatorActive, setIndicatorActive] = useState(false);
    const {y: currScrollY} = useWindowScroll();
    
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setNavVisible] = useState(true);

    const toggleAudio = () => {
        setAudioPlaying((prev) => !prev);
        setIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if(currScrollY === 0){
            setNavVisible(true);
            navConRef.current.classList.remove('floating-nav');
        }
        else if(currScrollY > lastScrollY){
            setNavVisible(false);
            navConRef.current.classList.add('floating-nav');
        }
        else if(currScrollY < lastScrollY){
            setNavVisible(true);
            navConRef.current.classList.add('floating-nav');
        }

        setLastScrollY(currScrollY);
    }, [currScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navConRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisible]);

    useEffect(() => {
        if(isAudioPlaying){
            audioElement.current.play();
        }else{
            audioElement.current.pause();
        }
    }, [isAudioPlaying])

    return (
        <div ref = {navConRef} 
            className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <img src="public\img\logo.png" alt="logo" className='w-10'/>
                        <Button id="product-button" 
                                title="Products" 
                                rightIcon = {<TiLocationArrow/>} 
                                containerClass = "bg-blue-50 md:flex hidden items-center justify-center gap-1"/>
                    </div>
                    <div className=' flex h-full items-center'>
                        <div className='hidden md:block'>
                            {navItems.map((item) => (
                                <a key = {item} href = {`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                    {item}
                                </a>
                            ))};
                        </div>

                        <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudio}>
                            <audio ref={audioElement} className='hidden' src = "public/audio/loop.mp3" loop />
                                {[1,2,3,4].map((bar) => (
                                    <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style = {{animationDelay: `${bar * 0.1}s`}}/>
                                ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar