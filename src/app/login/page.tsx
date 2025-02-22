"use client";
import Email from "@/components/field/Email";
import Password from "@/components/field/Password";
import Text from "@/components/field/Text";
import Column from "@/components/layout/Column";
import Row from "@/components/layout/Row";
import { useState } from "react";

export default function Page() {

    const [cpf, setCPF] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(event: React.FormEvent) {
        try {
            event.preventDefault();
            setIsLoading(true);

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cpf, senha }),
            });

            if (response.ok) {
                const { token } = await response.json();
                document.cookie = `token=${token}; path=/`;
                
                window.location.reload();
            } else {
                setError("Login falhou. Verifique suas credenciais.");
            }
        } catch (error) {
            setError("Login falhou. Erro na conexão.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
                <h2 className="text-xl mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <Row>
                    <Column size={12}>
                        <Text
                            label="CPF"
                            placeholder="Cpf"
                            value={cpf}
                            onChange={(e: any) => setCPF(e.target.value)}
                            required
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={12}>
                        <Password
                            label="Senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e: any) => setSenha(e.target.value)}
                            required
                        />
                    </Column>
                </Row>

                <button disabled={isLoading} type="submit" className="w-full bg-sky-500 text-white p-2 rounded">
                    {isLoading ? ("Entrando...") : ("Entrar")}
                </button>
            </form>
        </div>
    );
}