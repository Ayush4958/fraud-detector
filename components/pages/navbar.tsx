"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState  , useEffect} from "react";
import SignUp from "../auth/signUp";
import ModalWrapper from "@/wrapper/modalWrapper";
import { logout , getUser } from "@/services/auth"
import { useAuth } from "@/context/authContext";

export function NavbarRes() {
    const navItems = [
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "Scans",
            link: "/scans",
        },
        {
            name: "Counter Bill",
            link: "/counter",
        },
    ];

    const [showLogin, setShowLogin] = useState(false);

     const { user, loading } = useAuth();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleLogin = () => setShowLogin(prev => !prev);

    return (
        <>
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-5 w-17 text-lg">
                        {user ? 
                        <NavbarButton variant="primary" onClick={logout}>Logout</NavbarButton> 
                        : <NavbarButton variant="primary" onClick={toggleLogin}>Login</NavbarButton>}
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/80 hover:text-[#447794] transition-colors py-2"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-3 pt-4 border-t border-[#447794]/30">
                             {user ? 
                        <NavbarButton variant="primary" onClick={logout}>Logout</NavbarButton> 
                        : <NavbarButton variant="primary" onClick={toggleLogin}>Login</NavbarButton>}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* ✔️ Overlay modal OUTSIDE layout (this fixes both issues) */}
    {showLogin && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <ModalWrapper onClose={toggleLogin}>

            <SignUp onClose={toggleLogin} />
             </ModalWrapper>
        </div>
    )}
           
        </>
         
    );
}
