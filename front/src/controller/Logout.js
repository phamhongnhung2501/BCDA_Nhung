import React from 'react';

class Logout extends React.Component{

    render() {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('project')
        
        return (
            <div>
                {
                    window.location.replace('/auth/sign-in')
                }
            </div>

        );
    }
}

export default Logout;
