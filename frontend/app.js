import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                <h1>Visualizing Convnet</h1>
                <h5>*ConvNet is running live in your browser</h5>
                <canvas ref="canvas" width={300} height={300} />
            </div>
        );
    }
}

ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('react-container')
);