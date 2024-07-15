import { MovieHome } from "../Components/MovieHome";
import Navbar from "../Components/NavbarComponent";

export function Home() {
    return (
        <>
            <Navbar />
            <main className="container">
                <div className="row">
                    <MovieHome
                        title={"Nobody"}
                        year={2022}
                        rating={7.9}
                        image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaBUJOHmiD5YjxuvXd-zJfO3Rd7ke0EUl2dQ&s"}
                        quality={"HD"} />
                    <MovieHome
                        title={"The Godfather"}
                        year={1972}
                        rating={8.0}
                        image={"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY281_CR4,0,190,281_.jpg"}
                        quality={"HD"}
                    />
                </div>
            </main>
        </>
    )
}