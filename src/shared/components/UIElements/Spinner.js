import React from 'react';

import  './Spinner.css'

const Spinner = (props) => (
        <div className={`${props.asOverlay && 'loading-spinner__overlay'}` }><div className="Loader"></div></div>
);

export default Spinner;