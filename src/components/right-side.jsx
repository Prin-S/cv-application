import { Fragment } from 'react';
import { checkStart, checkEnd, editInfo, cancelEditInfo, showOrHide } from './helper.js';

function EditEducationInformation({ item, onEduEdit }) {
    return (
        <div className="box text-left edit-box">
            <form id={item.id} onSubmit={onEduEdit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" defaultValue={item.university} required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" defaultValue={item.degree} required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" defaultValue={item.field} required /></label><br />
                <label htmlFor="edu-start">Start year: <input id="edu-start" className="input" type="text" onChange={checkStart} name="edu-start" defaultValue={item['edu-start']} required /></label><br />
                <label htmlFor="edu-end">End year: <input id="edu-end" className="input" type="text" onChange={checkEnd} name="edu-end" defaultValue={item['edu-end']} required /></label><br /><br />
                <button className="button" type="submit">Save</button> <button className="button" type="reset" onClick={() => cancelEditInfo(item)}>Cancel</button>
            </form>
        </div>
    );
}

function RenderEducation({ item, onEduEdit, onEduDelete, buttonStatus }) {
    return (
        <>
            <div id={item.id + '-1'}>
                <div className="each-entry">
                    <h3 className="full">{item.university}</h3>
                    <p className="one-fifth">{item['edu-start']}-{item['edu-end']}</p>
                    <p className="four-fifths">{item.degree} in {item.field}</p>
                    <div className={buttonStatus}><button id={item.id} className="button" onClick={() => editInfo(item)}>Edit</button> <button id={item.id} className="button" onClick={onEduDelete}>x</button></div>
                </div>
            </div>
            <div id={item.id + '-2'} style={{display: 'none'}}>
                <EditEducationInformation item={item} onEduEdit={onEduEdit} />
            </div>
        </>
    );
}

function EditWorkInformation({ item, onWorkEdit }) {
    return (
        <div className="box text-left edit-box">
            <form id={item.id} onSubmit={onWorkEdit}>
                <label htmlFor="position">Position: <input id="position" className="input" type="text" name="position" defaultValue={item.position} required /></label><br />
                <label htmlFor="com-org">Company/Organization: <input id="com-org" className="input" type="text" name="com-org" defaultValue={item['com-org']} required /></label><br />
                <label htmlFor="description">Description: <textarea id="description" className="input" rows="4" name="description" defaultValue={item.description} required></textarea></label><br />
                <label htmlFor="work-start">Start year: <input id="work-start" className="input" type="text" onChange={checkStart} name="work-start" defaultValue={item['work-start']} required /></label><br />
                <label htmlFor="work-end">End year: <input id="work-end" className="input" type="text" onChange={checkEnd} name="work-end" defaultValue={item['work-end']} required /></label><br /><br />
                <button className="button" type="submit">Save</button> <button className="button" type="reset" onClick={() => cancelEditInfo(item)}>Cancel</button>
            </form>
        </div>
    );
}

function RenderWork({ item, onWorkEdit, onWorkDelete, buttonStatus }) {
    return (
        <>
            <div id={item.id + '-1'}>
                <div className="each-entry">
                    <h3 className="full">{item.position}</h3>
                    <p className="one-fifth">{item['work-start']}-{item['work-end']}</p>
                    <p className="four-fifths">{item['com-org']}</p>
                    <p className="full">{item.description}</p>
                    <div className={buttonStatus}><button id={item.id} className="button" onClick={() => editInfo(item)}>Edit</button> <button id={item.id} className="button" onClick={onWorkDelete}>x</button></div>
                </div>
            </div>
            <div id={item.id + '-2'} style={{display: 'none'}}>
                <EditWorkInformation item={item} onWorkEdit={onWorkEdit} />
            </div>
        </>
    );
}

function RightSide({ genText, eduText, workText, onEduEdit, onEduDelete, onWorkEdit, onWorkDelete, buttonToggle }) {
    const buttonStatus = showOrHide(buttonToggle);

    return (
        <div className="container container-inner">
            <div className="box">
                <h2>{genText.name}</h2>
                <p>✉️ {genText.email}</p>
                <p>📞 {genText.phone}</p>
                <p>📍 {genText.location}</p>
                <p>🧐 {genText.about}</p>
            </div>
            <div className="box">
                <h2>Education</h2>
                {eduText.map(item => {
                    if (item == eduText[eduText.length - 1]) { // Don't add <hr /> to the last item.
                        return <RenderEducation key={item.id} item={item} onEduEdit={onEduEdit} onEduDelete={onEduDelete} buttonStatus={buttonStatus} />;
                    } else {
                        return <Fragment key={item.id}>
                            <RenderEducation key={item.id} item={item} onEduEdit={onEduEdit} onEduDelete={onEduDelete} buttonStatus={buttonStatus} />
                            <hr />
                        </Fragment>;
                    }
                })}
            </div>
            <div className="box">
                <h2>Work</h2>
                {workText.map(item => {
                    if (item == workText[workText.length - 1]) { // Don't add <hr /> to the last item.
                        return <RenderWork key={item.id} item={item} onWorkEdit={onWorkEdit} onWorkDelete={onWorkDelete} buttonStatus={buttonStatus} />;
                    } else {
                        return <Fragment key={item.id}>
                            <RenderWork item={item} onWorkEdit={onWorkEdit} onWorkDelete={onWorkDelete} buttonStatus={buttonStatus} />
                            <hr />
                        </Fragment>;
                    }
                })}
            </div>
        </div>
    );
}

export { RightSide };