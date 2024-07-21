'use client'

import {useRouter} from "next/navigation";

const Card = ({label, redirection}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(redirection);
    }

    return (
        <div className="flex overflow-x-auto justify-center">
            <div className="w-72 flex-none cursor-pointer flex flex-col items-center justify-center m-4 rounded-xl p-4
                 bg-over-light dark:bg-over-dark
                 hover:bg-selected-light dark:hover:bg-selected-dark
                 transition duration-300" onClick={() => handleClick()}>
                <div className="flex items-center justify-center">
                    <span className="font-medium text-2xl m-4 text-light dark:text-dark">
                        Create {label}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;
