'use client'

import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";
import Link from "next/link";
import { List, ListItem, ListItemText, MenuItem } from "@mui/material";
import { TbGlobe, TbHome, TbTransfer, TbAccessible, TbWallet } from "react-icons/tb";
import ThemeSwitch from "@/app/ThemeSwitch";
import React from "react";

const Sidebar = () => {
    const pathname = usePathname()
    const { resolvedTheme } = useTheme();

    return (
        <div className="h-full min-h-screen bg-over-light dark:bg-over-dark">
            <Link className="flex justify-between px-6 py-4 text-xl font-bold" href="/">
                <h1 className="text-light dark:text-dark">My Finances</h1>
            </Link>
            <div className="flex flex-col m-6">
                <ThemeSwitch/>
            </div>
            <div className="flex flex-col">
                <List>
                    <ListItem>
                        <ListItemText className="ml-2 text-light dark:text-dark" primary="General" />
                    </ListItem>
                    <MenuItem
                        component={Link}
                        href="/"
                        className={`${pathname === '/' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? (<TbHome style={{color: "black"}}  />) : (<TbHome/>)}
                        <ListItemText primary="Home" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href="/overview"
                        className={`${pathname === '/overview' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? (<TbGlobe style={{color: "black"}}  />) : (<TbGlobe/>)}
                        <ListItemText primary="Global Overview" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                </List>
                <List>
                    <ListItem>
                        <ListItemText className="ml-2 text-light dark:text-dark" primary="Finances" />
                    </ListItem>
                    <MenuItem
                        component={Link}
                        href="/customer"
                        className={`${pathname === '/customer' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? (<TbWallet style={{color: "black"}}  />) : (<TbWallet/>)}
                         <ListItemText primary="Customer" className="ml-2 text-light dark:text-dark" />
                     </MenuItem>
                     <MenuItem
                         component={Link}
                         href="/account"
                         className={`${pathname === '/account' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                         {resolvedTheme === 'light' ? (<TbAccessible style={{color: "black"}}  />) : (<TbAccessible/>)}
                         <ListItemText primary="Account" className="ml-2 text-light dark:text-dark" />
                     </MenuItem>
                     <MenuItem
                         component={Link}
                         href="/transaction"
                         className={`${pathname === '/transaction' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                         {resolvedTheme === 'light' ? (<TbTransfer style={{color: "black"}}  />) : (<TbTransfer/>)}
                         <ListItemText primary="Transaction" className="ml-2 text-light dark:text-dark" />
                     </MenuItem>
                </List>
            </div>
        </div>
    )
}

export default Sidebar;
