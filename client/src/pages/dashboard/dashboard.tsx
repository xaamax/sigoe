import { Content } from "@/layouts/content";
import PageTitle from "@/components/commons/page-title";
import Grid from "@/layouts/grid";
import { DreSelect } from "@/components/selects/dre-select";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  DashboardFormValues,
  dashboardSchema,
} from "./schema/dashboard-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UeSelect } from "@/components/selects/ue-select";
import SelectInput from "@/components/inputs/select-input";
import dayjs from "dayjs";
import Box from "@/widgets/box";
import { CheckCircle, ClipboardList, TriangleAlert } from "lucide-react";
import { useGetOcorrenciasDashboard } from "@/core/apis/queries/ocorrencias-query";
import OcorrenciaTipoChart from "./components/chart-tipo-ocorrencia";
import OcorrenciasDreChart from "./components/chart-ocorrencia-dre";
import OcorrenciasUeChart from "./components/chart-ocorrencia-ue";
import OcorrenciasTurmaChart from "./components/chart-ocorrencia-turma";

export function Dashboard() {
  const form = useForm<DashboardFormValues>({
    resolver: zodResolver(dashboardSchema),
    defaultValues: {
      ano_letivo: Number(dayjs().year()),
    },
  });

  const { data } = useGetOcorrenciasDashboard({
    ano_letivo: form.watch("ano_letivo"),
    codigo_dre: form.watch("dre"),
    codigo_ue: form.watch("ue"),
  });

  return (
    <Content>
      <PageTitle title="Dashboard" hideToBack />
      <Form {...form}>
        <Grid cols="12 12 3 3">
          <SelectInput
            type="number"
            label="Ano Letivo"
            placeholder="Selecione o Ano Letivo"
            name="ano_letivo"
            data={[2026, 2025].map((ano) => ({
              label: String(ano),
              value: ano,
            }))}
            form={form}
          />
          <DreSelect name="dre" form={form} withAsterisk={false} />
          <UeSelect name="ue" form={form} withAsterisk={false} />
        </Grid>
      </Form>

      <div className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Box
            title="Ocorrências Registradas"
            value={data?.data?.totalOcorrencias || 0}
            icon={TriangleAlert}
          />
          <Box
            title="Aguardando Análise"
            value={data?.data?.AguardandoAnalise || 0}
            icon={ClipboardList}
          />
          <Box
            title="Finalizadas"
            value={data?.data?.Finalizadas || 0}
            icon={CheckCircle}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 items-strech">
        <div className="col-span-8 h-full">
          {!form.watch("dre") && (
            <OcorrenciasDreChart
              chartData={data?.data?.ocorrenciasPorDre || []}
            />
          )}

          {form.watch("dre") && !form.watch("ue") && (
            <OcorrenciasUeChart
              chartData={data?.data?.ocorrenciasPorUe || []}
            />
          )}

          {form.watch("ue") && (
            <OcorrenciasTurmaChart
              chartData={data?.data?.ocorrenciasPorTurma || []}
            />
          )}
        </div>
        <div className="col-span-4">
          <OcorrenciaTipoChart
            chartData={data?.data?.ocorrenciasPorTipo || []}
          />
        </div>
      </div>

      {/* <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <BarChartMultiple />
            </div>

            <Card className="col-span-4 sm:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs> */}
    </Content>
  );
}
