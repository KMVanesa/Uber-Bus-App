import React from 'react';
import { Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <h1 style={{textAlign:'center', marginTop:'20%'}}>404! - Page Not Found<Link to="/">Go Home</Link></h1>
    </div>
);

export default NotFoundPage;