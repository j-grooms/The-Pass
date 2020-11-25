import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./tagSearchPage.css";

const TagSearchPage = () => {
  const statePhotos = useSelector(state => state.photo);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {}, [])


  if (!currentUser) return <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchValue)
  }

	return (
		<>
			<div className="tag-search-container">
				<p className="tag-form-header">
					Select a Tag and hit Search!
				</p>
				<form className="tag-form" onSubmit={handleSubmit}>
					<select className="tag-select" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}>
						<option value="">Select a Tag...</option>
						<option value="breakfast">Breakfast</option>
						<option value="entree">Entree</option>
						<option value="dessert">Dessert</option>
						<option value="beef">Beef</option>
						<option value="seafood">Seafood</option>
						<option value="chicken">Chicken</option>
						<option value="lamb">Lamb</option>
						<option value="salad">Salad</option>
					</select>
					<button className="tag-button">Search</button>
				</form>
			</div>
      <div className="search-results-container">
        <div className="search-results">

        </div>
      </div>
		</>
	);
};

export default TagSearchPage;
