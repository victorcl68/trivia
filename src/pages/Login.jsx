const React = require('react');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);

    this.state = {
      isButtonDisabled: true,
      name: '',
      gravatarEmail: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.checkInputs);
  }

  checkInputs() {
    const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { name, gravatarEmail } = this.state;

    const isValid = name.length > 0 && gravatarEmail.match(emailCheck);

    if (isValid) {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const { isButtonDisabled } = this.state;

    return (
      <main>
        <section>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              id="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="gravatarEmail">
            Email
            <input
              type="email"
              name="gravatarEmail"
              id="gravatarEmail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
        </section>

        <section>
          <button type="button" data-testid="btn-play" disabled={ isButtonDisabled }>
            Jogar
          </button>
        </section>
      </main>
    );
  }
}

export default Login;
