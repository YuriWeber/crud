module.exports = {
    // verificação de erros dos dados de registro
    CheckDataRegister: (data) => {
        const invalidChar = `{}[]()*¨¬¢£³²¹§;:<>,./?|\\°´~\`^-_&`
        
        
        if (data === undefined) {
            return {validate: false, error: "emptyFields"}
        }
        if (!("name" in data && "password" in data 
            && "passwordConfirm" in data)) {
                return {validate: false, error: "emptyFields"}
        }
        if (data.name === "" || data.password === "" || data.passwordConfirm === "") {
            return {validate: false, error: "emptyFields"}
        }
        if (data.name.length < 4) {return {validate: false, error: "shortName"}}
        if (data.password.length < 6) {return {validate: false, error: "shortPassword"}}
        if (data.password !== data.passwordConfirm) {return {validate: false, error: "differentPassword"}}
        for (const i of invalidChar) {
            if (data.password.includes(i)) {return {validate: false, error: "invalidChar"}}
        }
        return {validate: true}
    },

    CheckDataLogin: (data) => {
        if (data === undefined) {
            return {validate: false, error: "emptyFields"}
        }
        if (!("name" in data && "password" in data)) {
                return {validate: false, error: "emptyFields"}
        }
        if (data.name === "" || data.password === "") {
            return {validate: false, error: "emptyFields"}
        }
        return {validate: true}
    }
}