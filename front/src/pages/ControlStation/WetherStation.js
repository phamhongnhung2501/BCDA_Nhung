import React, { Component } from "react";

class WetherStation extends Component {
    render() {
        return (
            <div>
                <div id='map'>
                    <a
                        className='weatherwidget-io'
                        href='https://forecast7.com/en/21d00105d82/hanoi/'
                        data-label_1='HÀ NỘI'
                        data-icons='Climacons Animated'
                        data-theme='original'>
                        HÀ NỘI
                    </a>
                    {(function(d, s, id) {
                        var js,
                            fjs = d.getElementsByTagName(s)[0];
                        if (!d.getElementById(id)) {
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "https://weatherwidget.io/js/widget.min.js";
                            fjs.parentNode.insertBefore(js, fjs);
                        }
                    })(document, "script", "weatherwidget-io-js")}
                </div>
            </div>
        );
    }
}

export default WetherStation;
