import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Text from "@/components/commons/text"

type Props = {
  chartData: {
    label: string
    total: number
  }[]
}

const chartConfig = {
  total: {
    label: "Total de Ocorrências",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function OcorrenciasTurmaChart({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências por Turma</CardTitle>
        <CardDescription>
          Total de ocorrências por Turma da Unidade Educional
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          {!chartData.length ? (
            <div className="flex h-full w-full items-center justify-center">
              <Text className="text-muted-foreground">
                Nenhum registro encontrado.
              </Text>
            </div>
          ) : (
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={8}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
