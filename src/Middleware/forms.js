const requirements = ["deposit", "withdraw"];

const authLogin = (users, header, UserContext) => {
    if (requirements.includes(header.toLowerCase())) {
        UserContext = users.filter(user => user.loggedIn === true)[0];
        if (UserContext === undefined || UserContext === []){
            return false;
        } else {
          return UserContext;
        }
    }
    return true;
}

const frmOnChange = (e, frmImput, tmpFrmData) => {
    let tmpSubmit = false;
    tmpFrmData[e.target.name] = e.target.value;
    frmImput.map((frmImput) => {
      if (tmpFrmData[frmImput] === undefined) {
          tmpSubmit = true;
      } else {
        if (tmpFrmData[frmImput].length <= 0) tmpSubmit = true;
      }
    });
    return tmpSubmit;
}

const frmValidate = (formErrors, field, label) => {
    let error = {};
    if (field !== undefined) {
      if (!field.toString()) {
        error[`${label}`] = `${label} can't be empty`;
      } else {
        switch (label) {
            case "password":
              if (field.length < 8) error[`${label}`] = `Password must consist of at least 8 characters`;
              break;
            case "email":
              if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field) === false)
              error[`${label}`] = `Email is not valid`;
              break;
            case "transaction":
              if (parseFloat(field) < 0) error[`${label}`] = `The Transaction can't be a Negative Number`;
              if (parseFloat(field) === 0) error[`${label}`] = `The Transaction can't be $0`;
              if (isNaN(field)) error[`${label}`] = `The Transaction must be a Valid Number`;
              break;
            default:
        }
      }
    }
    formErrors = {...formErrors, ...error};
    return formErrors;
}

export { authLogin, frmValidate, frmOnChange }