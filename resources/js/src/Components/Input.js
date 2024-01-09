export default function Input({
  value,
  newOnChange,
  label = 'Animais',
  placeholder = 'Coloque o animal',
  type,
}) {
    
  function handleOnChange(e) {
    return newOnChange(e.currentTarget.value);
  }

  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id="exampleFormControlInput1"
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}
