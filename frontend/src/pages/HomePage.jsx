import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import RateLimitedUi from "../components/RateLimitedUi.jsx";
import api from "../lib/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound";
import SearchNotes from "../components/SearchNotes.jsx";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(res.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Error fetching notes");
                }
            } finally {
                setLoading(false);
            };
        }

        fetchNotes();
    }, []);
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedUi />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {!isRateLimited && !loading && <SearchNotes searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}

                {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

                {filteredNotes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

                {filteredNotes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>

                )}

            </div>

        </div>

    )
}
export default HomePage;