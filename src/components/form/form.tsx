import {useForm} from "@tanstack/react-form";
import {AddFormProps, Contact} from "../../types/type.ts";
import useMutationContacts from "../../hooks/useMutationContacts.ts";
import styles from './form.module.css';
import {FormEvent, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodValidator} from "@tanstack/zod-form-adapter";
import profileImage from '../../assets/profile.png';


const formSchema = z.object({
    name: z.string()
        .min(1, "This field is required")
        .min(2, 'Name must be at least 2 characters'),
    lastName: z.string()
        .min(1, "This field is required")
        .min(2, 'Last name must be at least 2 characters'),
    userName: z.string().min(5, 'Username must be at least 5 characters')
        .regex(/[A-Z]/, 'Username must contain at least one uppercase letter')
        .regex(/[\W_]/, 'Username must contain at least one special character'),
    info: z.string().min(1, "This field is required"),
    image: z.string().optional(),
});


function Form({handleSelectContact, data, contact}: AddFormProps) {
    const {addContact, updateContact} = useMutationContacts();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    let lastIndex: string | number = data.length ? (data as Contact[]).sort((a: Contact, b: Contact) => +b.id - +a.id)[0].id : 1



    useEffect(() => {
        if (contact?.image) {
            setImagePreview(contact.image);
        }
        else {
            setImagePreview(profileImage)
        }
    }, [contact])

    const form = useForm({

        defaultValues: {
            name: contact?.name || '',
            lastName: contact?.lastName || '',
            userName: contact?.userName || '',
            info: contact?.info || '',
            image: contact?.image || profileImage,
        },
        onSubmit(value: { value: Contact | Omit<Contact, 'id'> }) {
            try {
                if (contact) {
                    updateContact(
                        {id: contact.id, body: {id: contact.id, ...value.value}},
                        {
                            onSuccess: (updatedContact: Contact) => {
                                localStorage.setItem('contact', JSON.stringify(updatedContact));
                                navigate(`/contacts/${updatedContact.id}`);
                                handleSelectContact(updatedContact.id);
                                form.reset();
                            },
                            onError: (error: Error) => {
                                console.error("Error updating contact:", error);
                            },
                        }
                    );
                } else {
                    addContact(
                        {
                            ...value.value,
                            image: value.value.image ? value.value.image : profileImage,
                            id: (!data ? 1 : ++(lastIndex as number)).toString(),
                        },
                        {
                            onSuccess: (newContact: Contact) => {
                                localStorage.setItem('contact', JSON.stringify(newContact));
                                navigate(`/contacts/${newContact.id}`);
                                handleSelectContact(newContact.id);
                                form.reset();
                            },
                            onError: (error: Error) => {
                                console.error("Error creating contact:", error);
                            },
                        }
                    );
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        validatorAdapter: zodValidator(),
    });

    return (
        <form
            className={styles.form}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.stopPropagation();
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <h2 className={styles.title}>{contact ? 'Edit' : 'Add'} Contact</h2>

            <form.Field
                name="name"
                validators={{
                    onBlur: formSchema.shape.name,
                }}
                children={(field: any) => (
                    <>
                        {!!field.state.meta.errors.length && (field.state.meta.isTouched) && (
                            <div className={styles.error}>{field.state.meta.errors.join(', ')}</div>
                        )}
                        <input
                            id="name"
                            value={field.state.value}
                            placeholder="First Name"
                            onChange={(e) => {
                                field.handleChange(e.target.value);
                                field.handleBlur();
                            }}
                            onBlur={field.handleBlur}
                        />
                    </>
                )}
            />

            <form.Field
                name="lastName"
                validators={{
                    onBlur: formSchema.shape.lastName,
                }}
                children={(field: any) => (
                    <>
                        {!!field.state.meta.errors.length && (field.state.meta.isTouched) && (
                            <div className={styles.error}>{field.state.meta.errors.join(', ')}</div>
                        )}
                        <input
                            id="lastName"
                            placeholder="Last Name"
                            value={field.state.value}
                            onChange={(e) => {
                                field.handleChange(e.target.value);
                                field.handleBlur()
                            }
                            }
                            onBlur={field.handleBlur}
                        />
                    </>
                )}
            />

            <form.Field
                name="userName"
                validators={{
                    onBlur: formSchema.shape.userName,
                }}
                children={(field: any) => (
                    <>
                        {!!field.state.meta.errors.length && (field.state.meta.isTouched) && (
                            <div className={styles.error}>{field.state.meta.errors.join(', ')}</div>
                        )}
                        <input
                            id="userName"
                            placeholder="User Name"
                            value={field.state.value}
                            onChange={(e) => {
                                field.handleChange(e.target.value)
                                field.handleBlur()
                            }
                            }
                            onBlur={field.handleBlur}
                        />
                    </>
                )}
            />

            <form.Field
                name="info"
                children={(field: any) => (
                    <>
                        {!!field.state.meta.errors.length && (field.state.meta.isTouched) && (
                            <div className={styles.error}>{field.state.meta.errors.join(', ')}</div>
                        )}
                        <textarea
                            value={field.state.value}
                            placeholder="Additional information"
                            rows={10}
                            onChange={(e) => {
                                field.handleChange(e.target.value)
                                field.handleBlur()
                            }
                            }
                            onBlur={field.handleBlur}
                        />
                    </>
                )}
            />

            {imagePreview && <img src={imagePreview} onError={(e) => {e.target.src = profileImage;}}
                                  alt="loading image" style={{width: '130px'}}/>}

            <form.Field
                name="image"
                children={(field: any) => (
                    <>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => {
                                field.handleBlur();
                                const file = e.target.files?.[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    field.handleChange(url);
                                    setImagePreview(url);
                                }
                            }}
                            onBlur={field.handleBlur}
                        />
                        {!!field.state.meta.errors.length && (field.state.meta.isTouched) && (
                            <div className={styles.error}>{field.state.meta.errors.join(', ')}</div>
                        )}

                    </>
                )}
            />

            <div className={styles.btns_wrapper}>
                <button
                    className={styles.submit_btn}
                    type="submit"

                >
                    {contact ? 'Save' : 'Add'}
                </button>
                <button
                    className={styles.submit_btn}
                    onClick={() => navigate(contact ? `/contacts/${contact.id}` : '/')}
                    type="reset"
                >
                    Close
                </button>
            </div>
        </form>
    );
}

export default Form;