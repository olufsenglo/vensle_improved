const NavLinks = () => {
    return (
        <div style={{ "background-color":"black", "color": "white" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ul className="flex py-2">
                    <li className="mr-6"><a href="#">All Categories</a></li>
                    <li className="mr-6"><a href="#">Home Appliancies</a></li>
                    <li className="mr-6"><a href="#">Fashion</a></li>
                    <li className="mr-6"><a href="#">Sporting goods</a></li>
                    <li><a href="#">Computing</a></li>
                </ul>
            </div>
        </div>
    )
}

export default NavLinks;