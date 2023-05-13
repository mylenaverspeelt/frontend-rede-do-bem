import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState('')
  const [bio, setBio] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://api-backend-programaria.onrender.com/mulheres'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function setInputValueBio(event) {
    setBio(event.target.value)
  }

  function sendForm(event) {
    event.preventDefault()

    async function sendData() {
      await Axios.post(baseURL, {
        nome: nome,
        imagem: imagem,
        bio: bio
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setBio('')
    setImagem('')
  }

  return (
    <>
      <Header
        title='Rede do Bem'
        subtitle='Cadastre-se no nosso voluntariado e vamos transformar o mundo juntas'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return (
                <div key={repo._id} className={styles.cardRepo}>
                  <div className={styles.cardImgContainer}>
                    <img className={styles.cardRepoImage} src={repo.imagem} />
                  </div>
                  <details>
                    <summary className={styles.cardRepoSummary}>
                      {repo.nome}
                    </summary>
                    <p className={styles.cardRepoText}>{repo.bio}</p>
                  </details>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Realize seu cadastro</h2>
        <form className={styles.form} onSubmit={sendForm}>
          <input
            onChange={handleInputValueNome}
            placeholder="Digite o seu nome completo"
            value={nome}
            className={styles.formInput}
          />
          <textarea
            onChange={handleInputValueImagem}
            placeholder="Digite o link da sua imagem"
            value={imagem}
            className={styles.formTextArea}
          />
          <textarea
            onChange={setInputValueBio}
            placeholder="Digite sua minibiografia"
            value={bio}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
