import './App.css';
import MainContent from "./components/main/main-content";
import {Contact} from "./types/type";
import Contacts from "./components/conatcts";
import useContact from "./hooks/useContact";
import {useEffect, useState} from "react";
import Form from "./components/form/form.tsx";
import Detail from "./components/detail/detail";
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
    const {data, isLoading, error} = useContact();
    const [selectedContactId, setSelectedContactId] = useState<string>('');
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    },[]);


    function handleSelectedContact(id: string): void {
        setSelectedContactId(id);
    }

    function resetSelectedContactId(): void {
        setEditingContact(null);
        setSelectedContactId('');
    }

    function handleEditedContact(data: Contact) {
        setEditingContact(data);
    }

    function WelcomePage() {
        return (
            <>
                <div className="welcome_page">
                    <h1>Welcome to the Contact Management Interface</h1>
                    <p>
                        This application allows you to manage your contacts efficiently. You can add, edit, delete, and view contact details with ease.
                    </p>
                    <p>
                        Use the sidebar to navigate through your contacts or create a new one.
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <header>
                Contact Management Interface
            </header>

            <main>
                <aside>
                    <Contacts
                        error={error}
                        selectedContactId={selectedContactId}
                        isLoading={isLoading}
                        data={data}
                        handleSelectedContact={handleSelectedContact}
                        resetSelectedContactId={resetSelectedContactId}
                    />
                </aside>

                <section>
                    <MainContent>
                        <Routes>
                            <Route path="*" element={<WelcomePage />} />
                            <Route path="/" element={<WelcomePage />} />
                            <Route
                                path={'createNew'}
                                element={
                                    <Form
                                        data={data}
                                        handleSelectContact={handleSelectedContact}
                                    />}
                            />
                            <Route path={'contacts/:id'}
                                   element={<Detail
                                       contactId={selectedContactId}
                                       handleEdit={handleEditedContact}
                                   />}/>
                            <Route path={'edit/:id'}
                                   element={<Form
                                       data={data}
                                       handleSelectContact={handleSelectedContact}
                                       contact={editingContact}
                                   />}/>
                        </Routes>
                    </MainContent>
                </section>
            </main>
        </>
    );
}

export default App;
