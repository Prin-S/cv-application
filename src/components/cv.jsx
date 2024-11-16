import { useState } from 'react';
import '../styles/styles.css';

function GeneralInformation({ id, text, type, onChange }) {
    return (
        <>
            <label htmlFor={id}>{text}: <input id={id} className="input" type={type} name={id} onChange={onChange} /></label><br />
        </>
    );
}

function EducationInformation({ onSubmit }) {
    return (
        <div className="box form-box">
            <h2>Education</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" required /></label><br />
                <label htmlFor="start">Start date: <input id="start" className="input" type="text" name="start" required /></label><br />
                <label htmlFor="end">End date: <input id="end" className="input" type="text" name="end" required /></label><br />
                <button className="button" type="submit">Add</button>
            </form>
            
        </div>
    );
}

function LeftSide({ onGenChange, onEduSubmit }) {
    return (
        <div className="container container-inner">
            <div className="box form-box">
                <h2>General Information</h2>
                <form>
                    <GeneralInformation id="name" text="Name" type="text" onChange={onGenChange} />
                    <GeneralInformation id="email" text="Email" type="email" onChange={onGenChange} />
                    <GeneralInformation id="phone" text="Phone number" type="tel" onChange={onGenChange} />
                </form>
            </div>
            <EducationInformation onSubmit={onEduSubmit} />
        </div>
    );
}

function RenderEducation({ item }) {
    console.log(item.id);
    return (
        <ul>
            <li>{item.university}</li>
            <li>{item.degree}</li>
            <li>{item.field}</li>
            <li>{item.start}</li>
            <li>{item.end}</li>
        </ul>
    );
}

function RightSide({ genText, eduText }) {

    return (
        <div className="container container-inner">
            <div className="box">
                <p>Name: {genText.name}</p>
                <p>Email: {genText.email}</p>
                <p>Phone: {genText.phone}</p>
            </div>
            <div className="box">
                {eduText.map(item => {
                    return <RenderEducation key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
}

function CVContainer() {
    const [genInfo, setGenInfo] = useState({ name: '', email: '', phone: '' });
    const [eduInfo, setEduInfo] = useState([]);

    function handleGenInfoChange(e) {
        const newGenInfo = { ...genInfo, [e.target.id]: e.target.value };
        setGenInfo(newGenInfo);
    }

    function handleEduInfoSubmit(e) {
        e.preventDefault();
        const newEduInfo = [ ...eduInfo, { id: crypto.randomUUID(), university: e.target[0].value, degree: e.target[1].value, field: e.target[2].value, start: e.target[3].value, end: e.target[4].value } ];
        setEduInfo(newEduInfo);
    }

    return (
        <div className="container">
            <LeftSide onGenChange={handleGenInfoChange} onEduSubmit={handleEduInfoSubmit} />
            <RightSide genText={genInfo} eduText={eduInfo} />
        </div>
    );
}

export { CVContainer };