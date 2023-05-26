import React from "react";

const Forum = () => {
  return (
    <div className="forum-page">
      <div className="top-row">
        <div className="thread-btn-container">
          <button className="create-a-thread-btn">Create a thread</button>
        </div>
        <div className="search-container">
          <input placeholder="Search" className="search"></input>
        </div>
      </div>
      <div className="columns">
        <div className="left-column">
          <div>
            <h1 className="categories-title">Categories</h1>
            <ul className="categories-list">
              <li className="category-item">Fly Fishing</li>
              <li className="category-item">Freshwater Fishing</li>
              <li className="category-item">Saltwater Fishing</li>
            </ul>
          </div>
        </div>

        <div className="right-column">
          <div className="threads-header">
            <h1 className="threads-title">Threads</h1>
            <select className="filter">
              <option className="filter-option" value="newest">
                Newest
              </option>
              <option className="filter-option" value="oldest">
                Oldest
              </option>
              <option className="filter-option" value="most views">
                Most Views
              </option>
              <option className="filter-option" value="most commented">
                Most Commented
              </option>
            </select>
          </div>

          <div className="threads">
            <div className="thread">
              <h2 className="thread-title">Best Lure for Bass Fishing?</h2>
              <p className="thread-content">
                I've been trying to catch some bass lately, and I'm wondering
                what lure works best. Any recommendations? I usually fish in
                freshwater lakes and rivers. Thanks!
              </p>
              <p className="thread-author">Posted by: Angler123</p>
            </div>

            <div className="thread">
              <h2 className="thread-title">Tips for Fly Fishing Beginners</h2>
              <p className="thread-content">
                I'm new to fly fishing and looking for some tips to get started.
                What are the essential gear and techniques I should know? Any
                advice would be greatly appreciated!
              </p>
              <p className="thread-author">Posted by: FlyFisher22</p>
            </div>

            <div className="thread">
              <h2 className="thread-title">Share Your Biggest Catch!</h2>
              <p className="thread-content">
                Let's see who caught the biggest fish! Share a photo of your
                biggest catch and tell us the story behind it. I'll start with
                mine, a massive 30-pound striped bass I caught off the coast of
                Maine last summer. Can't wait to see your impressive catches!
              </p>
              <p className="thread-author">Posted by: BigFisherman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
