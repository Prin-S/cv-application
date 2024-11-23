import { useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { hideAfterEditInfo } from './helper.js';
import { LeftSide } from './left-side.jsx'
import { RightSide } from './right-side.jsx';
import '../styles/styles.css';

function CVContainer() {
    const [genInfo, setGenInfo] = useState({ name: '', email: '', phone: '', location: '', about: '' });
    const [eduInfo, setEduInfo] = useState([]);
    const [workInfo, setWorkInfo] = useState([]);
    const [buttonToggle, setButtonToggle] = useState('Hide');

    function handleGenInfoChange(e) {
        const newGenInfo = { ...genInfo, [e.target.id]: e.target.value };
        setGenInfo(newGenInfo);
    }

    function handleEduInfoSubmit(e) {
        e.preventDefault();
        const newEduInfo = [ ...eduInfo, { id: crypto.randomUUID(), university: e.target[0].value, degree: e.target[1].value, field: e.target[2].value, 'edu-start': e.target[3].value, 'edu-end': e.target[4].value } ];
        newEduInfo.sort((a, b) => b['edu-start'] - a['edu-start']); // Sort the start year to show the latest year on top.
        setEduInfo(newEduInfo);
        e.target.reset();
    }

    function handleEduInfoEdit(e) {
        e.preventDefault();
        hideAfterEditInfo(e);

        const itemToEdit = eduInfo.find(item => item.id == e.target.id); // Update the existing entry.
        itemToEdit.university = e.target[0].value;
        itemToEdit.degree = e.target[1].value;
        itemToEdit.field = e.target[2].value;
        itemToEdit['edu-start'] = e.target[3].value;
        itemToEdit['edu-end'] = e.target[4].value;
        
        const newEduInfo = [ ...eduInfo.filter(item => item.id != e.target.id), itemToEdit ];
        newEduInfo.sort((a, b) => b['edu-start'] - a['edu-start']); // Sort the start year to show the latest year on top.
        setEduInfo(newEduInfo);
    }

    function handleEduInfoDelete(e) {
        const newEduInfo = eduInfo.filter(item => item.id != e.target.id );
        setEduInfo(newEduInfo);
    }

    function handleWorkInfoSubmit(e) {
        e.preventDefault();
        const newWorkInfo = [ ...workInfo, { id: crypto.randomUUID(), position: e.target[0].value, 'com-org': e.target[1].value, description: e.target[2].value, 'work-start': e.target[3].value, 'work-end': e.target[4].value } ];
        newWorkInfo.sort((a, b) => b['work-start'] - a['work-start']); // Sort the start year to show the latest year on top.
        setWorkInfo(newWorkInfo);
        e.target.reset();
    }

    function handleWorkInfoEdit(e) {
        e.preventDefault();
        hideAfterEditInfo(e);

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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `CV - ${genInfo.name}`,
        pageStyle: '.right-container { width: 100%; margin-left: auto; margin-right: auto; }',
    });

    function toggleButtons() {
        const allButtons = document.getElementsByClassName('buttons-display');
        
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.toggle('buttons-hide');
        }

        if (buttonToggle == 'Hide') {
            setButtonToggle('Show');
        } else {
            setButtonToggle('Hide');
        }
    }

    return (
        <>
            <div className="full button-right">
                <button className="button" onClick={toggleButtons}>{buttonToggle} Buttons</button> <button className="button" onClick={handlePrint}>Print CV</button>
            </div>
            <div className="container">
                <div className="left-container">
                    <LeftSide
                        onGenChange={handleGenInfoChange}
                        onEduSubmit={handleEduInfoSubmit}
                        onWorkSubmit={handleWorkInfoSubmit}
                    />
                </div>
                <div className="right-container" ref={componentRef}>
                    <RightSide
                        genText={genInfo}
                        eduText={eduInfo}
                        workText={workInfo}
                        onEduEdit={handleEduInfoEdit}
                        onEduDelete={handleEduInfoDelete}
                        onWorkEdit={handleWorkInfoEdit}
                        onWorkDelete={handleWorkInfoDelete}
                        buttonToggle={buttonToggle}
                    />
                </div>
            </div>
        </>
    );
}

export { CVContainer };