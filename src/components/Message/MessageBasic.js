import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const MessageBasic = ({usernameClass, username, message}) => {

    return(
        <Fragment>
            <section className="messageUsernameLayout">
                <span className={usernameClass}>{username}</span>
            </section>
            <section className="messageContentLayout">
                <p className="messageContent">{message}</p>
            </section>
        </Fragment>
    );

};


MessageBasic.propTypes = {
    authUser: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    message: propTypes.string.isRequired
}


export default MessageBasic
