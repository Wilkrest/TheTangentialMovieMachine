import DOMPurify from 'dompurify'

const FormField = function (props) {
    //update functions for the fields
    const updateForm = function (e) {
        //initialize the new form data object
        const newFormData = {
            ...props.formData
        };

        //sanitize the input value
        const newValue = DOMPurify.sanitize(e.target.value);

        //set the new value on the form
        newFormData[`${props.name}`] = newValue;

        //update the form's state data
        props.updateFormData(newFormData);
    }

    //pass required boolean if the field is required
    return(
        <div className="formFieldContainer">
            <input className='input is-small' placeholder={props.label} type={props.type} name={props.name} required={props.required} onChange={updateForm}/>
        </div>
    ); 
}

export default FormField