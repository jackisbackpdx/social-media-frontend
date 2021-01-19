import React, { Component } from 'react'

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import AppIcon from '../images/ape-logo.png'
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

import theme from '../util/theme'

const styles = theme;

class Login extends Component {
constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        errors: {}
    }
}

componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors})
    }
}

handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

render() {
    const { classes, UI: {loading} } = this.props;
    const { errors } = this.state;

    let invalidText
    if(errors.error){
        invalidText = 'Wrong credentials, please try again.'
    } else if (errors.general) {
        invalidText = errors.general;
    } else {
        invalidText = '';
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img alt='mokey-logo' src={AppIcon} className={classes.logo}/>
                <Typography variant='h2' className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                        id='email' 
                        name='email' 
                        type='email' 
                        label='Email' 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth/>
                    <TextField 
                        id='password' 
                        name='password' 
                        type='password' 
                        label='Password' 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>
                        {invalidText && (
                            <Typography variant='body2' className={classes.customError}>
                                {invalidText}
                            </Typography>
                        )}
                    <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary' 
                        className={classes.button}
                        disabled={loading}>
                    Login
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
                    </Button>
                </form>
                <small>Don't have an account? sign up <Link to='/signup'>here</Link></small>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = { loginUser }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))
