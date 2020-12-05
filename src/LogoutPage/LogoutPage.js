import React from 'react';

function LogoutPage() {
    React.useEffect(() => {
        localStorage.removeItem('userId');
        localStorage.removeItem('jwt');
    }, []);
    return (
        <div>
            Logout Successful
        </div>
    );
}

export default LogoutPage;