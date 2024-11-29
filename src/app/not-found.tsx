import AlertWarning from "@/components/alert/AlertWarning";
import ButtonWarning from "@/components/button/ButtonWarning";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NotFound() {
    return (<>
        <AlertWarning title="Página não encontrada!">
            <ul className="list-disc list-inside">
                <li><strong>Verifique a URL:</strong> Certifique-se de que o endereço da página foi digitado corretamente. Um pequeno erro pode levar você a uma página inexistente.</li>
                <li><strong>Volte à Página Inicial:</strong> Tente acessar a página inicial do nosso site e navegar pelas seções para encontrar o que você está buscando.</li>
                <li><strong>Tente um Link Direto:</strong> Se você tiver um link direto para a página, tente acessá-lo novamente, pois pode ter ocorrido um erro na navegação anterior.</li>
                <li><strong>Limpe o Cache do Navegador:</strong> Às vezes, o navegador pode armazenar uma versão antiga da página. Limpar o cache pode ajudar a corrigir o problema.</li>
                <li><strong>Entre em Contato Conosco:</strong> Se você acha que esta página deveria estar disponível, entre em contato com nosso suporte técnico para mais informações.</li>
            </ul>
            <div className="mt-4">
                <Link href="/">
                    <ButtonWarning>
                        <FontAwesomeIcon icon={faHome} /> Voltar ao Início
                    </ButtonWarning>
                </Link>
            </div>
        </AlertWarning>
    </>);
}