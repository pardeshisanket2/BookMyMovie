import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import './Header.css'
import logo from '../../assets/logo.svg'
import {
    Button,
    FormControl,
    Tabs,
    Tab,
    AppBar,
    Card,
    ClickAwayListener,
    InputLabel,
    Input,
    FormHelperText,
    CardContent,
    Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";

const TabPanel = function (props) {
    const {children, value, index} = props;

    return (
        <Typography component="div" style={{padding: 0, textAlign: "center"}}>
            {
                value === index && (
                    <div>
                    {props.children}
                    </div>
                )
            }
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
}


const Header = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState(0);
    const [usernameRequired, setUsernameRequired] = useState("dispNone");
    const [username, setUsername] = useState("");
    const [loginPasswordRequired,setLoginPasswordRequired] = useState("dispNone");
    const [loginPassword, setLoginPassword] = useState("");
    const [firstnameRequired, setFirstnameRequired] = useState("dispNone");
    const [firstname, setFirstname] = useState("");
    const [lastnameRequired, setLastnameRequired] = useState("dispNone");
    const [lastname, setLastname] = useState("initialState");
    const [emailRequired, setEmailRequired] = useState("dispNone");
    const [email, setEmail] = useState("");
    const [registerPasswordRequired, setRegisterPasswordRequired] = useState("dispNone");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginApiError, setLoginApiError] = useState("");
    const [registerApiError, setRegisterApiError] = useState("");
    const [contactRequired, setContactRequired] = useState("dispNone");
    const [contact, setContact] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        sessionStorage.getItem("access-token") != null
    );

    const openModalHandler = () => {
        setOpenModal(true);
        setValue(0);
        setUsernameRequired("dispNone");
        setUsername("");
        setLoginPasswordRequired("dispNone");
        setLoginPassword("");
        setFirstnameRequired("dispNone");
        setFirstname("");
        setLastnameRequired("dispNone");
        setLastname("");
        setEmailRequired("dispNone");
        setEmail("");
        setRegisterPasswordRequired("dispNone");
        setRegisterPassword("");
        setContactRequired("dispNone");
        setContact("");

    }

    const closeModalHandler = () => {
        setOpenModal(false);
    }

    const tabChangeHandler = (event, newValue) => {
        setValue(newValue);
    }


    const loginClickHandler = () => {
        username === "" ? setUsernameRequired("dispBlock") : setUsernameRequired("dispNone");
        loginPassword === "" ? setLoginPasswordRequired("dispBlock") : setLoginPasswordRequired("dispNone");
        setLoginApiError("");
        if(username === "" || loginPassword === "") return ;

        let dataLogin = null;

        fetch(props.baseUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Basic " + window.btoa(username + ":" + loginPassword),
            },
            body: dataLogin,
            })
            .then(async (response) => {
                if (response.ok){
                    sessionStorage.setItem(
                        "access-token",
                        response.headers.get("access-token")
                    );
                    return response.json();
                } else {
                    let error = await response.json();
                    setLoginApiError(error.message);

                    throw new Error("Something went wrong");
                }
            })
            .then((data) => {
                sessionStorage.setItem("uuid",data.id);
                setLoggedIn(true);
                closeModalHandler();
            })
            .catch((error) => {});
    };

    const inputUserNameChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const inputLoginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }

    const registerClickHandler = () => {
        firstname === "" ? setFirstnameRequired("dispBlock") : setFirstnameRequired("dispNone");
        lastname === "" ? setLastnameRequired("dispBlock") : setLastnameRequired("dispNone");
        email === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone");
        registerPassword === "" ? setRegisterPasswordRequired("dispBlock") : setRegisterPasswordRequired("dispNone");
        contact === "" ? setContactRequired("dispBlock") : setContactRequired("dispNone");

        setRegisterApiError("");
        if (
            firstname === "" ||
            lastname === "" ||
            email === "" ||
            registerPassword === "" ||
            contact === ""
        )
            return ;

        let dataSignup = JSON.stringify({
            email_address: email,
            first_name: firstname,
            last_name: lastname,
            mobile_number: contact,
            password: registerPassword
        });

        fetch(props.baseUrl + "signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataSignup,
        })
            .then(async (response) => {
                if (response.ok){
                    sessionStorage.setItem(
                        "access-token",
                        response.headers.get("access-token")
                    );
                    return response.json();
                } else {
                    let error = await response.json();
                    setLoginApiError(error.message);

                    throw new Error("Something went wrong");
                }
            })
            .then((data) => {
                sessionStorage.setItem("uuid",data.id);
                setRegistrationSuccess(true);
                closeModalHandler();
            })
            .catch((error) => {});
    }

    const inputFirstnameChangeHandler = (e) => {
        setFirstname(e.target.value);
    }

    const inputLastnameChangeHandler = (e) => {
        setLastname(e.target.value);
    }

    const inputEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const inputRegisterPasswordChangeHandler = (e) => {
        setRegisterPassword(e.target.value);
    }

    const inputContactChangeHandler = (e) => {
        setContact(e.target.value);
    }

    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        setLoggedIn(false)
    }


    return (
        <Fragment>
            <div className="header">
                <img src={logo} className="logoStyles" alt="Website logo"/>

                {!loggedIn ?
                    <div className="loginButton">
                    <Button variant="contained" color="default" onClick={openModalHandler}>LOGIN</Button>
                    </div>
                    :
                    <div className="loginButton">
                        <Button variant="contained" color="default" onClick={logoutHandler}>LOGOUT</Button>
                    </div>
                }


                {props.showBookShowButton === "true" && !loggedIn
                    ? <div className="bookshowButton">
                        <Button variant="contained" color="primary" onClick={openModalHandler}>BOOK SHOW</Button>
                    </div>
                    : ""
                }

                {props.showBookShowButton === "true" && loggedIn
                    ? <div className="bookshowButton">
                        <Link to={"/bookshow/" + props.id}>
                            <Button variant="contained" color="primary">BOOK SHOW</Button>
                        </Link>
                    </div>
                    : ""
                }

            </div>
                <Modal
                    isOpen={openModal}
                    onHide={closeModalHandler}
                    ariaHideApp={false}
                    className="modal">

                    <ClickAwayListener onClickAway={closeModalHandler}>
                        <Card className="cardStyle">
                            <CardContent>
                            <AppBar position="static" color="transparent" className="appbar">
                                <Tabs value={value} onChange={tabChangeHandler}>
                                    <Tab label="LOGIN"/>
                                    <Tab label="REGISTER"/>
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0}>
                                <br/>
                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input required
                                           id="username"
                                           type="text"
                                           name="username"
                                           onChange={inputUserNameChangeHandler}
                                    />
                                    <FormHelperText className={usernameRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>
                                    <br/>
                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input required
                                           id="password"
                                           type="password"
                                           name="password"
                                           onChange={inputLoginPasswordChangeHandler}
                                    />
                                    <FormHelperText className={loginPasswordRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>
                                    <br/><br/>
                                    <Button  variant="contained" color="primary" type="submit" onClick={loginClickHandler}>LOGIN</Button>
                                    <br/>
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <br/>
                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input required
                                           id="firstname"
                                           type="text"
                                           name="firstname"
                                           onChange={inputFirstnameChangeHandler}
                                    />
                                    <FormHelperText className={firstnameRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>


                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input required
                                           id="lastname"
                                           type="text"
                                           name="lastname"
                                           onChange={inputLastnameChangeHandler}
                                    />
                                    <FormHelperText className={lastnameRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>

                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input required
                                           id="email"
                                           type="email"
                                           name="email"
                                           onChange={inputEmailChangeHandler}
                                    />
                                    <FormHelperText className={emailRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>


                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input required
                                           id="password"
                                           type="password"
                                           name="password"
                                           onChange={inputRegisterPasswordChangeHandler}
                                    />
                                    <FormHelperText className={registerPasswordRequired}>
                                        <span className="red">Required!</span>
                                    </FormHelperText>
                                </FormControl>

                                <FormControl required className="formControl">
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input required
                                           id="contact"
                                           type="number"
                                           name="contact"
                                           onChange={inputContactChangeHandler}
                                    />
                                <FormHelperText className={contactRequired}>
                                    <span className="red">Required!</span>
                                </FormHelperText>
                                </FormControl>

                                <br/><br/>

                                <FormHelperText className={registrationSuccess}>
                                    <span>Registration Successful! Please Login!</span>
                                </FormHelperText>

                                <br/>

                                <FormControl required className="formControl">
                                    <Button variant="contained" color="primary" onClick={registerClickHandler}>REGISTER</Button>
                                </FormControl>
                                    <br/>
                            </TabPanel>
                            </CardContent>
                        </Card>
                    </ClickAwayListener>


                </Modal>

        </Fragment>
    )
}

export default Header;