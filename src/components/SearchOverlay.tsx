import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import KeyboardList from "./KeyboardList";
import "./SearchOverlay.css";

interface Props {
    onClose: () => void;
}

const SearchOverlay: React.FC<Props> = ({ onClose }) => {
    const [search, setSearch] = useState("");
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e:MouseEvent) => {
            if (
                overlayRef.current && 
                !overlayRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClose]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div className="search-overlay">
            <div className="search-panel" ref={overlayRef}>
                <SearchBar
                value={search}
                onChange={setSearch}
                active
                onFocus={() => {}}
                onBlur={() => {}}
                />

                {search.length > 0 && (
                    <div className="search-results">
                        <KeyboardList
                        searchTerm={search}
                        limit={6}
                        showActions={false}
                        />
                        </div>
                )}
            </div>
        </div>
    );
};

export default SearchOverlay;

