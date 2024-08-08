import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (() => {
    const [taxNumber, setTaxNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('https://interview.t-alpha.com.br/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taxNumber: taxNumber,
                    password: password
                })
            })

            if (!response.ok) {
                setError(response.json())
            }

            const result = await response.json();

            localStorage.setItem('token', result.data.token);
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input
                name="cpnjCpf"
                type="text"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                placeholder="CPF ou CPNJ"
                maxLength={14}
                minLength={11}
                required
            />
            <input
                name="password"
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
            />
            <button type="submit">Entrar</button>
            <button><Link to="/register">Criar conta</Link></button>

            {error && <p>{error}</p>}
        </form>
    )
})

export default Login