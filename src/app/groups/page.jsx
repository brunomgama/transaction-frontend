import React from 'react';
import category from '../../enums/transaction/category';

const Groups = async () => {
    return (
        <div className="grid grid-cols-4 gap-4 p-5">
            {category.map((item, index) => (
                <button key={index} className="p-2 bg-over-light dark:bg-over-dark text-light dark:text-dark
                hover:bg-selected-light dark:hover:bg-selected-dark rounded-xl">
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default Groups;
