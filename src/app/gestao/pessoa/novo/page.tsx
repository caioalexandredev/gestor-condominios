import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Fields from "@/components/field/Fields";
import Text from "@/components/field/Text";
import Column from "@/components/layout/Column";
import Row from "@/components/layout/Row";

export default function Page() {
    return (<>
        <H1>Cadastrar Pessoa</H1>

        <Card className="mt-3">
            <H4 className="text-slate-700">Dados Pessoais</H4>
            <hr className="mb-3" />
            <Row>
                <Column size={6}>
                    <Text label="Nome" name="nome" id="nome" minLength="150" required  />
                </Column>
                <Column size={6}>
                    <Text label="Sobrenome" name="sobrenome" id="sobrenome" minLength="150" requiredsW/>
                </Column>
            </Row>
        </Card>

        <Card>
            <H4 className="text-slate-700">Contatos</H4>
            <hr className="mb-3" />
        </Card>

        <Card>
            <H4 className="text-slate-700">Endereço</H4>
            <hr className="mb-3" />
        </Card>
    </>)
}