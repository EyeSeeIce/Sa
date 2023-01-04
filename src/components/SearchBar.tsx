import React from 'react';
import {useState} from "react";
import {ChangeEvent} from "react";


interface ISearchItem {
    onChange: (str: string) => void
}



const SearchBar = ({onChange}: ISearchItem) => {
    return (
        <div className={""}>
            <input type="text" className={"border py-2 px-4 mb-4 mt-4 w-full  outline-0"}
                   onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
};

export default SearchBar;