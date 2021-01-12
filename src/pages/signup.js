import React, { Component } from 'react'

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import AppIcon from '../images/ape-logo.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import styles from '../styles'

class Signup extends Component {
constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        loading: false,
        errors: {}
    }
}


handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
        loading: true
    })
    const newUserData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.handle
    }
    axios.post('/signup', newUserData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({
                loading: false
            })
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

render() {
    const {classes} = this.props;
    const { errors, loading } = this.state;

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img alt='mokey-logo' src={AppIcon} className={classes.logo}/>
                <Typography variant='h2' className={classes.pageTitle}>
                    Signup
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
                    <TextField 
                        id='confirmPassword' 
                        name='confirmPassword' 
                        type='password' 
                        label='Confirm Password' 
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField 
                        id='handle' 
                        name='handle' 
                        type='text' 
                        label='Handle' 
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle} 
                        onChange={this.handleChange} 
                        fullWidth/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                    <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary' 
                        className={classes.button}
                        disabled={loading}>
                    Signup
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
                    </Button>
                </form>
                <small>Already have an account? <Link to='/login'>Login</Link></small>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
