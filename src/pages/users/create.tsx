import styles from './users.module.scss';

export default function create(props) {
  console.log(props);
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <div className="container">
      <div>
        <h1>Cadastrar usuário</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
        </div>
        <div className={styles.form_buttons}>
          <div>
            <button type="submit">Salvar</button>
          </div>
          <div>
            <button type="reset">Limpar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
