import {useState} from "react";
import {Contact, ContactProp} from "../types/type.ts";
import Search from "./search/search.tsx";
import {Link} from "react-router-dom";
import styles from './contacts.module.css'

function Contacts({
                      data,
                      isLoading,
                      error,
                      handleSelectedContact,
                      resetSelectedContactId,
                      selectedContactId
                  }: ContactProp) {

    const [searchValue, setSearchValue] = useState<string>('')

    function handleInputValue(value: string) {
        setSearchValue(value);
    }

    const filteredContacts: Contact[] =
        data ? (data as Contact[]).sort((a: Contact, b: Contact) => parseInt(b.id) - parseInt(a.id))
            .filter((contact: Contact) => {
                const name = `${contact.name} `.toLowerCase();
                const lastName = ` ${contact.lastName}`.toLowerCase()
                return name.includes(searchValue.toLowerCase()) || lastName.includes(searchValue.toLowerCase());
            }) : []


    if (isLoading) {
        return <div>Loading.. </div>
    }
    if (error) {
        return <div>error.message</div>
    }


    return (
        <>
            <div className={styles.search_wrapper}>
                <h2 className={styles.title}>Contacts</h2>
                <div className={styles.search_content}>

                    <Search handleInput={handleInputValue}/>
                    <Link to="/createNew">
                        <button
                            onClick={resetSelectedContactId}
                            className={styles.new_btn}>
                            New
                        </button>
                    </Link>
                </div>
            </div>


            <ul className={styles.list}>
                {filteredContacts.map((contact: Contact) => {
                    return (
                        <Link key={contact.id} to={`contacts/${contact.id}`}>
                            <li className={selectedContactId === contact.id ? styles.active : styles.item}
                                onClick={() => handleSelectedContact(contact.id)}>
                                {contact.name} {contact.lastName}</li>
                        </Link>)
                })}
            </ul>
        </>
    )
}

export default Contacts