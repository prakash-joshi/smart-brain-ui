import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imgUrl }) => {

    const faces = box.map((ele, i) => {
        return (<div key={i} className='bounding-box' style={{ top: ele.topRow, right: ele.rightCol, bottom: ele.bottomRow, left: ele.leftCol }}></div>);
    })

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputImage" src={imgUrl} alt='' width='300px' height='auto' />
                {faces}
            </div>
        </div >
    )
}

export default FaceRecognition;