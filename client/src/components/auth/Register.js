import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmed: '',
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = e => {
        const { name, email, password, passwordConfirmed } = this.state;

        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            passwordConfirmed
        }

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { name, email, password, passwordConfirmed, errors } = this.state;

        return (
            <div>
                <div className="flex w-full items-center justify-center min-h-screen max-w-sm mx-auto">
                    <form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="username"
                                >
                                Name
                            </label>
                            <input
                                className={classnames('shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline', {'is-invalid': errors.name})}
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={this.onChange}
                                placeholder="Name"
                                />
                            {errors.name && (
                                <p className="invalid-message">{errors.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="username"
                                >
                                Email
                            </label>
                            <input
                                className={classnames('shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline', {'is-invalid': errors.email})}
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                placeholder="Email"
                                />
                            {errors.email && (
                                <p className="invalid-message">{errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="password"
                                >
                                Password
                            </label>
                            <input
                                className={classnames('shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline', {'is-invalid': errors.password})}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.onChange}
                                placeholder="******************"
                                />
                            { errors.password && (
                                <p className="invalid-message">{errors.password}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="password"
                                >
                                Confirm Password
                            </label>
                            <input
                                className={classnames('shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline', {'is-invalid': errors.passwordConfirmed})}
                                id="passwordConfirmed"
                                name="passwordConfirmed"
                                type="password"
                                value={passwordConfirmed}
                                onChange={this.onChange}
                                placeholder="******************"
                                />
                            { errors.passwordConfirmed && (
                                <p className="invalid-message">{errors.passwordConfirmed}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Sign In
                            </button>
                            <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                            Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
