import React from 'react';
import classes from './SideBarBox.module.css'

const SideBarBox = (props) => {
    return (
        <div className={classes.sideBarBox}>
            {props.children}
        </div>
    );
};

export default SideBarBox;