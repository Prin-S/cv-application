import { checkStart, checkEnd } from './helper.js';

function GeneralInformation({ id, text, onChange }) {
    if (id == 'about') {
        return (
            <>
                <label htmlFor={id}>{text}: <textarea id={id} className="input" rows="4" name={id} onChange={onChange}></textarea></label><br />
            </>
        );
    } else {
        return (
            <>
                <label htmlFor={id}>{text}: <input id={id} className="input" type="text" name={id} onChange={onChange} /></label><br />
            </>
        );
    }
}

function EducationInformation({ onEduSubmit }) {
    return (
        <div className="box text-left">
            <h2>Education</h2>
            <form onSubmit={onEduSubmit}>
                <label htmlFor="university">University: <input id="university" className="input" type="text" name="university" required /></label><br />
                <label htmlFor="degree">Degree: <input id="degree" className="input" type="text" name="degree" required /></label><br />
                <label htmlFor="field">Field of study: <input id="field" className="input" type="text" name="field" required /></label><br />
                <label htmlFor="edu-start">Start year: <input id="edu-start" className="input" type="text" onChange={checkStart} name="edu-start" required /></label><br />
                <label htmlFor="edu-end">End year: <input id="edu-end" className="input" type="text" onChange={checkEnd} name="edu-end" required /></label><br /><br />
                <button className="button" type="submit">Add</button>
            </form>
        </div>
    );
}

function WorkInformation({ onWorkSubmit }) {
    return (
        <div className="box text-left">
            <h2>Work</h2>
            <form onSubmit={onWorkSubmit}>
                <label htmlFor="position">Position: <input id="position" className="input" type="text" name="position" required /></label><br />
                <label htmlFor="com-org">Company/Organization: <input id="com-org" className="input" type="text" name="com-org" required /></label><br />
                <label htmlFor="description">Description: <textarea id="description" className="input" rows="4" name="description" required></textarea></label><br />
                <label htmlFor="work-start">Start year: <input id="work-start" className="input" type="text" onChange={checkStart} name="work-start" required /></label><br />
                <label htmlFor="work-end">End year: <input id="work-end" className="input" type="text" onChange={checkEnd} name="work-end" required /></label><br /><br />
                <button className="button" type="submit">Add</button>
            </form>
        </div>
    );
}

function LeftSide({ onGenChange, onEduSubmit, onWorkSubmit }) {
    return (
        <div className="container container-inner">
            <div className="box text-left">
                <h2>General</h2>
                <form>
                    <GeneralInformation id="name" text="Name" onChange={onGenChange} />
                    <GeneralInformation id="email" text="Email" onChange={onGenChange} />
                    <GeneralInformation id="phone" text="Phone number" onChange={onGenChange} />
                    <GeneralInformation id="location" text="Location" onChange={onGenChange} />
                    <GeneralInformation id="about" text="About" onChange={onGenChange} />
                </form>
            </div>
            <EducationInformation onEduSubmit={onEduSubmit} />
            <WorkInformation onWorkSubmit={onWorkSubmit} />
        </div>
    );
}

export { LeftSide };