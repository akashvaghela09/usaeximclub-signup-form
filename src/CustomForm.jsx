import React, { useState } from 'react';
import { useMailchimp } from 'react-use-mailchimp';
import styles from "./CustomForm.module.css";

const CustomForm = () => {
    const url = process.env.REACT_APP_URL;

    const [state, subscribe] = useMailchimp({ url });

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmitBtn = async () => {
        let obj = {}
        obj["EMAIL"] = email;
        obj["FNAME"] = firstName;
        obj["LNAME"] = lastName;

        setRedirect(true)
        await subscribe(obj);
    }

    const handleMsg = (para) => {
        const string = para.slice(4);
        console.log(string)
        return string;
    }


    console.log(state)
    return (
        <>
            {
                redirect === false ?
                    <div className={styles.form}>


                        <p className={styles.title}>Sign Up for USAEXIM CLUB</p>
                        <div className={styles.inputDiv}>
                            <label className={styles.formLabel}>First Name</label>
                            <input className={styles.inputField} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="first name" />
                        </div>
                        <div className={styles.inputDiv}>
                            <label className={styles.formLabel}>Last Name</label>
                            <input className={styles.inputField} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="last name" />
                        </div>
                        <div className={styles.inputDiv}>
                            <label className={styles.formLabel}>Email</label>
                            <input className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                        </div>
                        <button className={styles.submitButton} onClick={() => handleSubmitBtn()}>Submit</button>


                    </div>
                    :
                    <div className={styles.modalDiv}>
                        {
                            state.error !== null &&
                            <div className={styles.errDiv}>
                                <p className={styles.errText1}>Got an Error</p>
                                <p className={styles.errText2}>{state.error.message}</p>
                                <button onClick={() => setRedirect(false)} className={styles.submitButton}>Try Again</button>
                            </div>
                        }
                        {
                            state.loading === false && state.error === null && state.data !== null ?
                            <div className={styles.dataDiv}>
                                <p className={styles.dataText1}>{state.data.result} !!</p>
                                <p className={styles.dataText2}>{state.data.msg}</p>
                            </div>
                            :
                            null
                        }
                        {
                            state.loading !== false && <p className={styles.loading}>Loading ...</p>
                        }
                    </div>

            }
        </>
    )
}

export { CustomForm }