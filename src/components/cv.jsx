import { useState } from 'react';
import '../styles/styles.css';

function GeneralInformation({ id, text, type, onChange }) {
    return (
        <>
            <label htmlFor={id}>{text}: <input id={id} className="input" type={type} name={id} onChange={onChange} /></label><br />
        </>
    );
}

function LeftSide({ onChange }) {
    return (
        <>
            <div className="box form-box">
                <form>
                    <GeneralInformation id="name" text="Name" type="text" onChange={onChange} />
                    <GeneralInformation id="email" text="Email" type="email" onChange={onChange} />
                    <GeneralInformation id="phone" text="Phone number" type="tel" onChange={onChange} />
                </form>
            </div>

        </>
    );
}

function RightSide({ text }) {
    return (
        <div className="box">
            <p>Name: {text.name}</p>
            <p>Email: {text.email}</p>
            <p>Phone: {text.phone}</p>
        </div>
    );
}

function CVContainer() {
    const [genInfo, setGenInfo] = useState({ name: '', email: '', phone: '' });

    function handleChange(e) {
        const newGenInfo = { ...genInfo, [e.target.id]: e.target.value };
        setGenInfo(newGenInfo);
    }

    return (
        <div className="container">
            <LeftSide onChange={handleChange} />
            <RightSide text={genInfo} />
        </div>
    );
}

export { CVContainer };