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
                <label htmlFor="end">End date: <input id="end" className="input" type="text" name="end" required /></label><br /><br />
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
        <div className="box form-box edit-box">
            <form id={item.id} onSubmit={onEduEdit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" defaultValue={item.university} required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" defaultValue={item.degree} required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" defaultValue={item.field} required /></label><br />
                <label htmlFor="start">Start year: <input id="start" className="input" type="text" name="start" defaultValue={item.start} required /></label><br />
                <label htmlFor="end">End year: <input id="end" className="input" type="text" name="end" defaultValue={item.end} required /></label><br /><br />
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
        <>
            <div id={item.id + '-1'}>
                <div className="each-entry">
                    <h3 className="full">{item.university}</h3>
                    <p className="one-fifth">{item.start}-{item.end}</p>
                    <p className="four-fifths">{item.degree} in {item.field}</p>
                    <div className="full"><button id={item.id} className="button" onClick={editEduInfo}>Edit</button> <button id={item.id} className="button" onClick={onClick}>x</button></div>
                </div>
            </div>
            <div id={item.id + '-2'} style={{display: 'none'}}>
                <EditEducationInformation item={item} onEduEdit={onEduEdit} />
            </div>
        </>
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
                    if (item == eduText[eduText.length - 1]) {
                        return <RenderEducation key={item.id} item={item} onEduEdit={onEduEdit} onClick={onEduDelete} />;
                    } else {
                        return <>
                            <RenderEducation key={item.id} item={item} onEduEdit={onEduEdit} onClick={onEduDelete} />
                            <hr />
                        </>;
                    }
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
        newEduInfo.sort((a, b) => b.start - a.start); // Sort the start year to show the latest year on top.
        setEduInfo(newEduInfo);
        e.target.reset();
    }

    function handleEduInfoEdit(e) {
        e.preventDefault();

        // Hide the form and display the information.
        document.getElementById(e.target.id + '-1').style.display = 'block';
        document.getElementById(e.target.id + '-2').style.display = 'none';

        const itemToEdit = eduInfo.find(item => item.id == e.target.id); // Update the existing entry.
        itemToEdit.university = e.target[0].value;
        itemToEdit.degree = e.target[1].value;
        itemToEdit.field = e.target[2].value;
        itemToEdit.start = e.target[3].value;
        itemToEdit.end = e.target[4].value;
        
        const newEduInfo = [ ...eduInfo.filter(item => item.id != e.target.id), itemToEdit ];
        newEduInfo.sort((a, b) => b.start - a.start); // Sort the start year to show the latest year on top.
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