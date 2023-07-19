import React, { useEffect, useState, useReducer, useContext ,useRef} from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const CollegeReducer = (state , action) => {
  if(action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 0};
  }

  if(action.type === "INPUT_BLUR") {
    return { value: "" , isValid: false};
  }

  return { value: "", isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  //const [enteredCollege, setEnteredCollege] = useState("");
  //const [collegeIsValid, setCollegeIsValid] = useState();
 
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchCollege] = useReducer(CollegeReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);


  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();

  // useEffect(() => {
  //   console.log("Effect is Running");

  //   return () => {
  //     console.log("Effect CleanUp");
  //   };
  // },);

  // useEffect(() => {
  //  const identifier = setTimeout(()=> {
  //   console.log('Checking form Validity');
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //   );

  //   },500)

  //   return () => {
  //     console.log("CleanUP");
  //     clearTimeout(identifier);

  //   };

  // }, [enteredEmail,enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        event.target.value.length > 6 &&
        collegeState.isValid
    );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
      passwordState.isValid && 
      event.target.value.length > 0
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
    {
      authCtx.onLogin(emailState.value, passwordState.value ,collegeState.value);
    }
    else if(!emailIsValid) {
      emailInputRef.current.focus();
    }
    else if(!passwordIsValid){
      passwordInputRef.current.focus();
    }
    else {
      collegeInputRef.current.focus();
    }
  };

  const {isValid : emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  const {isValid: collegeIsValid} = collegeState;

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
         <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
       
       <Input
          ref={collegeInputRef}
          id="college"
          label="College"
          type="college"
          isValid={collegeIsValid}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        ></Input>
       
        {/* <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college"> College Name </label>
          <input
            type="text"
            id="id"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
