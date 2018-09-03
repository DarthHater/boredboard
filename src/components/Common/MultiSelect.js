import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import AsyncSelect from 'react-select/lib/Async';
import UserService from '../../services/UserService';
import { connect } from 'react-redux';
import { messageActions } from '../../actions/messageActions';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '15px'
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center'
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    selectMenu: {
        backgroundColor: 'red'
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
}

const Control = (props) => {
    return (
        <TextValidator
            fullWidth
            name="message-users"
            validators={['multiselectNotEmpty']}
            errorMessages={['this field is required']}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

const Option = (props) => {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

const Placeholder = (props) => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

const SingleValue = (props) => {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

const ValueContainer = (props) => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

const MultiValue = (props) => {
    return (
        <Chip
            tabIndex={-1}
            key={props.data.value}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={event => {
                props.removeProps.onClick();
                props.removeProps.onMouseDown(event);
            }}
        />
    );
}

const Menu = (props) => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Option,
    Control,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    MultiValue,
    ValueContainer,
    Menu
};

const promiseOptions = inputValue =>
    new Promise(async (resolve) => {
        let result = await UserService.getUsers(inputValue);
        if (result.length) {
            return resolve(result.map(res => {
                return {
                    label: res.Username,
                    value: res.ID
                }
            }))
        }
        resolve([]);
    });

class MultiSelect extends Component {

    onChange = users => {
        let formatted = users.map(user => {
            return {
                ID: user.value,
                Username: user.label
            }
        });
        this.props.dispatch(messageActions.updateMessageUsers(formatted));
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
            }),
        };

        return (
            <div className={classes.root}>
                <AsyncSelect
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                        label: 'Select some users',
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    value={this.props.message_users.map(user => {
                        return {
                            value: user.ID,
                            label: user.Username
                        }
                    })}
                    isMulti
                    autoFocus
                    onChange={this.onChange}
                    components={components}
                    placeholder={"Type here"}
                    loadOptions={promiseOptions}
                />
            </div>
        );
    }
}

MultiSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        message_users: state.message_users
    };
}

export default connect(mapStateToProps)(
    withStyles(
        styles, { withTheme: true }
    )(MultiSelect)
)
