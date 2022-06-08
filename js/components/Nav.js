const Nav = () => {
    //language=HTML
    return `
        <nav class="navbar">
            <a href="/movies-app">Home</a>
            <a href="/movies-app/my_movie_list.html">My List</a>
            <div class="dropdown">
                <button class="dropbtn">Genre
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#">Action</a>
                    <a href="#">Romance</a>
                    <a href="#">Documentary</a>
                </div>
            </div>
            <form id="movie-search">
                <input type="text" placeholder="Search.." name="search">
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </nav>
    `;
};


document.write(Nav());