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

function EditEducationInformation({ item, onEduEdit }) {
    return (
        <div className="box form-box">
            <form id={item.id} onSubmit={onEduEdit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" defaultValue={item.university} required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" defaultValue={item.degree} required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" defaultValue={item.field} required /></label><br />
                <label htmlFor="start">Start date: <input id="start" className="input" type="text" name="start" defaultValue={item.start} required /></label><br />
                <label htmlFor="end">End date: <input id="end" className="input" type="text" name="end" defaultValue={item.end} required /></label><br />
                <button className="button" type="submit">Save</button>
            </form>
        </div>
    );
}

function RenderEducation({ item, onEduEdit, onClick }) {
    function editEduInfo() { // Hide the displayed information while it is being edited.
        document.getElementById(item.id + '-1').style.display = 'none';
        document.getElementById(item.id + '-2').style.display = 'block';
    }

    return (
        <div>
            <div id={item.id + '-1'}>
                <h3>{item.university}</h3>
                <p>{item.field} in {item.degree}</p>
                <p>From {item.start} to {item.end}</p>
                <button id={item.id} className="button" onClick={editEduInfo}>Edit</button> <button id={item.id} className="button" onClick={onClick}>x</button>
            </div>
            <div id={item.id + '-2'} style={{display: 'none'}}>
                <EditEducationInformation item={item} onEduEdit={onEduEdit} />
            </div>
        </div>
    );
}

function RightSide({ genText, eduText, onEduEdit, onEduDelete }) {

    return (
        <div className="container container-inner">
            <div className="box">
                <p>Name: {genText.name}</p>
                <p>Email: {genText.email}</p>
                <p>Phone: {genText.phone}</p>
            </div>
            <div className="box">
                {eduText.map(item => {
                    return <RenderEducation key={item.id} item={item} onEduEdit={onEduEdit} onClick={onEduDelete} />;
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
        e.target.reset();
    }

    function handleEduInfoEdit(e) {
        e.preventDefault();

        // Hide the form and display the information.
        document.getElementById(e.target.id + '-1').style.display = 'block';
        document.getElementById(e.target.id + '-2').style.display = 'none';

        const itemToEdit = eduInfo.find(item => item.id == e.target.id);
        itemToEdit.university = e.target[0].value;
        itemToEdit.degree = e.target[1].value;
        itemToEdit.field = e.target[2].value;
        itemToEdit.start = e.target[3].value;
        itemToEdit.end = e.target[4].value;
        
        const newEduInfo = [ ...eduInfo.filter(item => item.id != e.target.id), itemToEdit ];
        setEduInfo(newEduInfo);
    }

    function handleEduInfoDelete(e) {
        const newEduInfo = eduInfo.filter(item => item.id != e.target.id );
        setEduInfo(newEduInfo);
    }

    return (
        <div className="container">
            <LeftSide onGenChange={handleGenInfoChange} onEduSubmit={handleEduInfoSubmit} />
            <RightSide genText={genInfo} eduText={eduInfo} onEduEdit={handleEduInfoEdit} onEduDelete={handleEduInfoDelete} />
        </div>
    );
}

export { CVContainer };