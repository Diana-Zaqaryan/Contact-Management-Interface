import useContact from "../../hooks/useContact.ts";
import styles from './detail.module.css'
import useMutationContacts from "../../hooks/useMutationContacts.ts";
import {useNavigate} from "react-router-dom";
import {Contact, DetailProp} from "../../types/type";
import {useEffect} from "react";
import profileImage from '../../assets/profile.png';


function Detail({contactId, handleEdit}: DetailProp) {

    const {data, isLoading, error, refetch} = useContact(contactId);
    const {deleteContact} = useMutationContacts()
    const navigate = useNavigate();
    const dataForDetail = data as Contact

    useEffect(() => {
        refetch()
    }, [contactId])

    function handleDelete(contactId: string): null {
        const answer = confirm('Are you sure ?')
        if (answer) {
            deleteContact(contactId.toString())
        }
        return null
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    if (error) {
        console.log(error.message)
    }
    return (
        <>
            <div className={styles.info}>
                <div className={styles.profile_photo}>
                    <img
                        style={{backgroundSize: 'cover', width: '100%', height: '100%'}}
                        alt="profile photo"
                        src={dataForDetail.image ? dataForDetail.image : profileImage}
                        onError={e => {
                            e.target.src = profileImage;
                        }
                        }
                    />
                </div>
                <div className={styles.user_data}>
                    <h2 className={styles.user_name}>{dataForDetail.name} {dataForDetail.lastName}</h2>
                    <h3>{dataForDetail.userName}</h3>
                    <p>{dataForDetail.info}</p>

                    <div>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                handleEdit(data as Contact)
                                navigate(`/edit/${contactId}`)
                            }}>
                            Edit
                        </button>
                        <button
                            className={styles.btn}
                            onClick={() => handleDelete(contactId)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail