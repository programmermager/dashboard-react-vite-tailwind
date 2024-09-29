function Form({type, placeholder, onInput}){
    return (
        <input className="w-full rounded-lg border active:border-black p-2 text-sm" placeholder={placeholder} type={type} onInput={onInput}/>
    );
}

export default Form;