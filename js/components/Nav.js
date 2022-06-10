import { Component } from '../Component.js';

export const Nav = () => new Component(null, {
    //language=HTML
    template: (props) => `
        <nav class="navbar">
            <a href="/movies-app">Home</a>
            <a href="/movies-app/my_movie_list.html">My List</a>

            <h1 class="main-title">The Movie Depot</h1>
            <form id="movie-search">
                <input type="text" placeholder="Search.." name="search">
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </nav>`
});


