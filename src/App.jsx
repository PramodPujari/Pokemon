import { BrowserRouter, Routes, Route } from "react-router-dom"
import DetailsPage from "./components/DetailsPage"
import SearchPage from "./components/SearchPage"
import BookmarksPage from "./components/BookmarksPage"
import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/details/:pokemonName" element={<DetailsPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App