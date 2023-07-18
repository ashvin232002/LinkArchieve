export default function validate(values){
    const validators={
        email:val=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        phone:val=>/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(val),
        name:val=>/^[a-zA-Z ]{2,30}$/.test(val),
        message:val=> val.length>3,
        password:val=>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        confirmation:val=>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        street:val=>/^([a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)$/.test(val),
        zip:val=>/^[1-9][0-9][0-9][0-9][0-9][0-9]$/.test(val),
        promo:val=>true,
        city:val=>val.length!==0,
        state:val=>val.length!==0
    }
    const valid={}
    Object.keys(values).map(field=>{
        valid[field]=validators[field](values[field])
    })
    return valid;
}