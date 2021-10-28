import React, {useState} from 'react'
const Togglable = (props) =>{
    const [visible, setVisible] = useState(false);
    const hideThenVisible = {display: visible? 'none': ''};
    const showThenVisible = {display: visible? '': 'none'};

    const toggleVisible = () => {setVisible(!visible)};
    return (
        <div>
            <div style = {hideThenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style = {showThenVisible}>
                {props.children}            
                <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>
    )


}
export default Togglable;