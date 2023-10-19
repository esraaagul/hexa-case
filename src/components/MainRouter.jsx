
import { Route, BrowserRouter, Routes } from "react-router-dom";
import FilePage from "./Page/FilePage";

const MainRouter = () => {

    // SET JWT TOKEN
    sessionStorage.setItem("JwtToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdNaW5kSWQiOiJiMTBkMTIzNDU2Nzg5MDEyMzQ1Njc4MDFhYmNkZTEyMyIsImNsaWVudElkIjoiY2xpZW50IiwibWF0dGVySWQiOiJhMjBiMTIzNDU2Nzg5MDEyMzQ1Njc4OTIwMDAwMDAwMCIsImlhdCI6MTY5NDUyOTM3NX0.Y1kIHn9jk-9mk_NBF16eu6gHA8-ClqXtwXSSiLtL7jo");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<FilePage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}


export default MainRouter;