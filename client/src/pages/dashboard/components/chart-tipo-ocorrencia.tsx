import { Pie, PieChart } from "recharts";

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Text from "@/components/commons/text";

type Props = {
    chartData: {
        label: string
        total: number
    }[]
}

const chartConfig = {
    comportamento: {
        label: "Comportamento",
        color: "hsl(var(--primary))",
    },
    saude: {
        label: "Saúde",
        color: "hsl(var(--chart-2))",
    },
    convivencia: {
        label: "Convivência",
        color: "hsl(var(--chart-3))",
    },
    acidente: {
        label: "Acidente",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const normalizeKey = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

export default function OcorrenciaTipoChart({ chartData }: Props) {
    const normalizedData = chartData.map(item => {
        const key = normalizeKey(item.label)

        return {
            ...item,
            tipoKey: key,
            fill: `var(--color-${key})`,
        }
    })

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-0">
                <CardTitle>Ocorrências por Tipo</CardTitle>
                <CardDescription>
                    Total de ocorrências por Tipo
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square"
                >
                    {!chartData.length ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <Text className="text-muted-foreground">
                                Nenhum registro encontrado.
                            </Text>
                        </div>
                    ) : (
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

                            <Pie
                                data={normalizedData}
                                dataKey="total"
                                nameKey="tipoKey"
                            />

                            <ChartLegend
                                content={<ChartLegendContent nameKey="tipoKey" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

