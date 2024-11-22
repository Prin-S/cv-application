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

function WorkInformation({ onSubmit }) {
    return (
        <div className="box form-box">
            <h2>Work</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="position">Position: <input id="position" className="input" type="text" name="position" required /></label><br />
                <label htmlFor="com-org">Company/Organization: <input id="com-org" className="input" type="text" name="com-org" required /></label><br />
                <label htmlFor="description">Description: <input id="description" className="input" type="text" name="description" required /></label><br />
                <label htmlFor="work-start">Start date: <input id="work-start" className="input" type="text" name="work-start" required /></label><br />
                <label htmlFor="work-end">End date: <input id="work-end" className="input" type="text" name="work-end" required /></label><br /><br />
                <button className="button" type="submit">Add</button>
            </form>
        </div>
    );
}

function LeftSide({ onGenChange, onEduSubmit, onWorkSubmit }) {
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
            <WorkInformation onSubmit={onWorkSubmit} />
        </div>
    );
}

function EditEducationInformation({ item, onEduEdit }) {
    function cancelEditEduInfo() { // Hide the form and display the information.
        document.getElementById(item.id + '-1').style.display = 'block';
        document.getElementById(item.id + '-2').style.display = 'none';
    }

    return (
        <div className="box form-box edit-box">
            <form id={item.id} onSubmit={onEduEdit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" defaultValue={item.university} required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" defaultValue={item.degree} required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" defaultValue={item.field} required /></label><br />
                <label htmlFor="start">Start year: <input id="start" className="input" type="text" name="start" defaultValue={item.start} required /></label><br />
                <label htmlFor="end">End year: <input id="end" className="input" type="text" name="end" defaultValue={item.end} required /></label><br /><br />
                <button className="button" type="submit">Save</button> <button className="button" type="reset" onClick={cancelEditEduInfo}>Cancel</button>
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

function EditWorkInformation({ item, onWorkEdit }) {
    function cancelEditWorkInfo() { // Hide the form and display the information.
        document.getElementById(item.id + '-1').style.display = 'block';
        document.getElementById(item.id + '-2').style.display = 'none';
    }

    return (
        <div className="box form-box edit-box">
            <form id={item.id} onSubmit={onWorkEdit}>
                <label htmlFor="position">Position: <input id="position" className="input" type="text" name="position" defaultValue={item.position} required /></label><br />
                <label htmlFor="com-org">Company/Organization: <input id="com-org" className="input" type="text" name="com-org" defaultValue={item['com-org']} required /></label><br />
                <label htmlFor="description">Description: <input id="description" className="input" type="text" name="description" defaultValue={item.description} required /></label><br />
                <label htmlFor="work-start">Start date: <input id="work-start" className="input" type="text" name="work-start" defaultValue={item['work-start']} required /></label><br />
                <label htmlFor="work-end">End date: <input id="work-end" className="input" type="text" name="work-end" defaultValue={item['work-end']} required /></label><br /><br />
                <button className="button" type="submit">Save</button> <button className="button" type="reset" onClick={cancelEditWorkInfo}>Cancel</button>
            </form>
        </div>
    );
}

function RenderWork({ item, onWorkEdit, onClick }) {
    function editWorkInfo() { // Hide the displayed information while it is being edited.
        document.getElementById(item.id + '-1').style.display = 'none';
        document.getElementById(item.id + '-2').style.display = 'block';
    }

    return (
        <>
            <div id={item.id + '-1'}>
                <div className="each-entry">
                    <h3 className="full">{item.position}</h3>
                    <p className="one-fifth">{item['work-start']}-{item['work-end']}</p>
                    <p className="four-fifths">{item['com-org']}</p>
                    <p className="full">{item.description}</p>
                    <div className="full"><button id={item.id} className="button" onClick={editWorkInfo}>Edit</button> <button id={item.id} className="button" onClick={onClick}>x</button></div>
                </div>
            </div>
            <div id={item.id + '-2'} style={{display: 'none'}}>
                <EditWorkInformation item={item} onWorkEdit={onWorkEdit} />
            </div>
        </>
    );
}

function RightSide({ genText, eduText, workText, onEduEdit, onEduDelete, onWorkEdit, onWorkDelete }) {
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
            <div className="box">
                {workText.map(item => {
                    if (item == workText[workText.length - 1]) {
                        return <RenderWork key={item.id} item={item} onWorkEdit={onWorkEdit} onClick={onWorkDelete} />;
                    } else {
                        return <>
                            <RenderWork key={item.id} item={item} onWorkEdit={onWorkEdit} onClick={onWorkDelete} />
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
    const [workInfo, setWorkInfo] = useState([]);

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

    function handleWorkInfoSubmit(e) {
        e.preventDefault();
        const newWorkInfo = [ ...workInfo, { id: crypto.randomUUID(), position: e.target[0].value, 'com-org': e.target[1].value, description: e.target[2].value, 'work-start': e.target[3].value, 'work-end': e.target[4].value } ];
        newWorkInfo.sort((a, b) => b.start - a.start); // Sort the start year to show the latest year on top.
        setWorkInfo(newWorkInfo);
        e.target.reset();
    }

    function handleWorkInfoEdit(e) {
        e.preventDefault();

        // Hide the form and display the information.
        document.getElementById(e.target.id + '-1').style.display = 'block';
        document.getElementById(e.target.id + '-2').style.display = 'none';

        const itemToEdit = workInfo.find(item => item.id == e.target.id); // Update the existing entry.
        itemToEdit.position = e.target[0].value;
        itemToEdit['com-org'] = e.target[1].value;
        itemToEdit.description = e.target[2].value;
        itemToEdit['work-start'] = e.target[3].value;
        itemToEdit['work-end'] = e.target[4].value;
        
        const newWorkInfo = [ ...workInfo.filter(item => item.id != e.target.id), itemToEdit ];
        newWorkInfo.sort((a, b) => b['work-start'] - a['work-start']); // Sort the start year to show the latest year on top.
        setWorkInfo(newWorkInfo);
    }

    function handleWorkInfoDelete(e) {
        const newWorkInfo = workInfo.filter(item => item.id != e.target.id );
        setWorkInfo(newWorkInfo);
    }

    return (
        <div className="container">
            <LeftSide
                onGenChange={handleGenInfoChange}
                onEduSubmit={handleEduInfoSubmit}
                onWorkSubmit={handleWorkInfoSubmit}
            />
            <RightSide
                genText={genInfo}
                eduText={eduInfo}
                workText={workInfo}
                onEduEdit={handleEduInfoEdit}
                onEduDelete={handleEduInfoDelete}
                onWorkEdit={handleWorkInfoEdit}
                onWorkDelete={handleWorkInfoDelete}
            />
        </div>
    );
}

export { CVContainer };