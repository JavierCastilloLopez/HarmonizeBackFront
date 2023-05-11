import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Cancion } from "./Cancion";
export function Buscador({serverURL}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleInputBlur = () => {
        setShowResults(false);
      }
    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        console.log(serverURL)

        if (value.trim().length > 0) {
            setShowResults(true);
        fetch(`${serverURL}/filtername/${value}`)
            .then(response => response.json())
            .then(data => {
                setResults(data)
                console.log(data)
            });
        } else {
            setShowResults(false);
            setResults([]);
          }
            
    }

    return (
        <div className="textInputWrapper">
            <div class="group">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
   
    <input type="text" className="input" value={query} onChange={handleInputChange} onBlur={handleInputBlur} />
</div>
            
            {showResults && (
        <ul className="search">
          {results.map((item, index) => (
            <Cancion cancion={item}/>
          ))}
        </ul>
      )}
        </div>
    );
}