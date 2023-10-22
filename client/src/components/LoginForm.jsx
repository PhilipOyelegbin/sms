function LoginForm({formData, isLoading, handleChange, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength="10"  placeholder="Enter your email" required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6"  placeholder="Enter your password" required/>
      </div>
      <button type="submit">{isLoading ? "Loading" : "Login"}</button>
    </form>
  )
}

LoginForm.propTypes = {formData: null, isLoading: null, handleChange: Function, handleSubmit: Function}

export default LoginForm