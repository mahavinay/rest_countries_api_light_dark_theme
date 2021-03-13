import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RestCountriesHome from "./components/RestCountriesHome";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div className="App">
            <Navigation />
            <RestCountriesHome />
        </div>
    );
}

export default App;
