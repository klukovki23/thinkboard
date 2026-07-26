import { SearchIcon, X } from "lucide-react";

const SearchNotes = ({ searchQuery, setSearchQuery }) => {
    const handleClear = () => {
        setSearchQuery("");
    };

    return (
        <div className="w-full mb-6">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-3 size-5 text-base-content/50" />
                <input
                    type="text"
                    placeholder="Search notes by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full pl-10 pr-10 bg-base-100"
                />
                {searchQuery && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-3 btn btn-ghost btn-xs p-0"
                    >
                        <X className="size-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchNotes;
