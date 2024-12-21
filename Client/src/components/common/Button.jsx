import PropTypes from 'prop-types';

const Button = ({ onClick, children, type }) => {
    return (
        <button type={type} className={`py-3 px-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
};

export default Button;