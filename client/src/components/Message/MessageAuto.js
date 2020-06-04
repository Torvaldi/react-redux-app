import React, { Fragment } from 'react';
import propTypes from 'prop-types';

const MessageAuto = ({username, message, messageClass}) => {

    return(
        <Fragment>
            <section className="messageUsernameLayout">
                <span className={messageClass}>{username} {message}</span>
            </section>
        </Fragment>
    );

};

MessageAuto.propTypes = {
    username: propTypes.string.isRequired,
    message: propTypes.string.isRequired,
}

export default MessageAuto
