"use client";
import CardInfoValue from "@/components/card/CardInfoValue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { faCarSide, faDollarSign, faInfoCircle, faMoneyBillTrendUp, faMoneyCheckDollar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0ea5e9",
  },
  mobile: {
    label: "Mobile",
    color: "#0ea5e9",
  },
} satisfies ChartConfig

export default function Home() {
  return (<>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardInfoValue
        icon={faUsers}
        title="Pessoas Cadastradas"
        description="20+"
        footer="+20.1% em relação ao ultimo mês"
      />
      <CardInfoValue
        icon={faCarSide}
        title="Veículos Cadastrados"
        description="80+"
        footer="+20.1% em relação ao ultimo mês"
      />
      <CardInfoValue
        icon={faDollarSign}
        title="Contas a Pagar"
        description="R$45.434,50+"
        footer="+20.1% em relação ao ultimo mês"
      />
      <CardInfoValue
        icon={faMoneyBillTrendUp}
        title="Contas a Receber"
        description="R$90.890,50+"
        footer="+20.1% em relação ao ultimo mês"
      />
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">Entrada Financeira - Último Ano</CardTitle>
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">Informativos</CardTitle>
          <FontAwesomeIcon icon={faInfoCircle} />
        </CardHeader>
        <CardContent>
          <div className="space-y-8 mt-3">
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Limpeza Geral</p>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nibh a orci tempus euismod. Curabitur cursus ornare laoreet. Nunc non efficitur lectus. Mauris placerat at nisi sit amet hendrerit. Aenean accumsan rutrum mauris vitae consectetur.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Limpeza Geral</p>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nibh a orci tempus euismod. Curabitur cursus ornare laoreet. Nunc non efficitur lectus. Mauris placerat at nisi sit amet hendrerit. Aenean accumsan rutrum mauris vitae consectetur.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Limpeza Geral</p>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nibh a orci tempus euismod. Curabitur cursus ornare laoreet. Nunc non efficitur lectus. Mauris placerat at nisi sit amet hendrerit. Aenean accumsan rutrum mauris vitae consectetur.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </>);
}
