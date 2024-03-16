import {React, useState} from "react";
import './Header.css';
import {createSearchParams, useNavigate} from "react-router-dom";


const Search = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [selectCategory, setSelectCategory] = useState("title");

    const inputHandler = (e) => {
        setInputText(e.target.value);
    };

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            // this makes query parameter
            // searchText=INPUT_TEXT&category=SELECT_CATEGORY
            const searchParam = createSearchParams({
                searchText: inputText,
                category: selectCategory
            });

            // Navigate to /search-page?SEARCH_PARAM above
            navigate({
                pathname: `/browse`,
                search: `?${searchParam}`
            })
        }
    }

    return (
        <div id="search-section">
            <input value={inputText} onChange={inputHandler} id="search-bar" placeholder = {selectCategory === "date" ? "YYYY-MM-DD" : "Search..."}
                   onKeyDown={onEnter}/>
            <select value={selectCategory} onChange={e => setSelectCategory(e.target.value)} id="selectList">
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="date">Date</option>
            </select>
        </div>
    )
}

export default Search;