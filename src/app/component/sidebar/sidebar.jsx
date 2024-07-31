'use client';

import {usePathname, useRouter} from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { List, ListItem, ListItemText, MenuItem } from '@mui/material';
import { TbTransactionEuro, TbGlobe, TbHome, TbTransfer, TbAccessible, TbWallet } from 'react-icons/tb';
import ThemeSwitch from '@/app/ThemeSwitch';
import React from 'react';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();

    const routeClient = () => {
        console.log("test")
        router.push("/customer/1")
    }

    return (
        <div className="relative h-full min-h-screen bg-over-light dark:bg-over-dark">
            <div className="flex flex-col pt-24">
                <List>
                    <MenuItem
                        component={Link}
                        href="/"
                        className={`${pathname === '/' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? <TbHome style={{ color: 'black' }} /> : <TbHome />}
                        <ListItemText primary="Home" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href="/actions"
                        className={`${pathname === '/actions' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? <TbTransactionEuro style={{ color: 'black' }} /> : <TbTransactionEuro />}
                        <ListItemText primary="Actions" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href="/overview"
                        className={`${pathname === '/overview' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? <TbGlobe style={{ color: 'black' }} /> : <TbGlobe />}
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
                        {resolvedTheme === 'light' ? <TbWallet style={{ color: 'black' }} /> : <TbWallet />}
                        <ListItemText primary="Customer" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href="/account"
                        className={`${pathname === '/account' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? <TbAccessible style={{ color: 'black' }} /> : <TbAccessible />}
                        <ListItemText primary="Account" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href="/transaction"
                        className={`${pathname === '/transaction' ? 'bg-selected-light dark:bg-selected-dark' : ''} m-4 my-2 py-2 rounded-xl flex justify-between`}>
                        {resolvedTheme === 'light' ? <TbTransfer style={{ color: 'black' }} /> : <TbTransfer />}
                        <ListItemText primary="Transaction" className="ml-2 text-light dark:text-dark" />
                    </MenuItem>
                </List>
            </div>
            <div className="absolute bottom-0 w-full" onClick={routeClient}>
                <div className="flex overflow-x-auto">
                    <div className="w-72 flex-none cursor-pointer flex flex-col m-4 rounded-xl p-4 hover:bg-over-light
                        dark:hover:bg-over-dark bg-selected-light dark:bg-selected-dark transition duration-300">
                        <div className="flex">
                            <img className="w-10 h-10 rounded-xl" src="/resources/customer/profile.png" alt="Default avatar" />
                            <div className="ml-4">
                                <div className="font-medium text-2xl text-light dark:text-dark">Bruno Gama</div>
                                <div className="text-sm text-light dark:text-dark">Software Engineer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
