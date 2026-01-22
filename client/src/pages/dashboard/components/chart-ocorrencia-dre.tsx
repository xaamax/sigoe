import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Text from "@/components/commons/text";

type Props = {
  chartData: {
    label: string;
    total: number;
  }[];
};

const chartConfig = {
  total: {
    label: "Total de Ocorrências",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function OcorrenciasDreChart({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências por DRE</CardTitle>
        <CardDescription>
          Total de ocorrências por Diretoria Regional de Educação
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
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: -40 }}
            >
              <CartesianGrid horizontal={false} />

              <XAxis type="number" dataKey="total" hide />

              <YAxis
                type="category"
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={160}
                tickFormatter={(value: string) =>
                  value
                    .replace("DIRETORIA REGIONAL DE EDUCAÇÃO ", "")
                    .slice(0, 20)
                }
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={6}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
