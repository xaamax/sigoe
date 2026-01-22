import Text from "@/components/commons/text";
import { Button } from "@/components/ui/button";
import { useModal } from "@saimin/react-modal-manager";

interface Props {
  onConfirm: () => void;
}

function ModalExcluirOcorrencia({ onConfirm }: Props) {
  const { close } = useModal();

  const handleCancel = () => {
    close("excluir-ocorrencia");
  };

  const handleLogout = () => {
    onConfirm();
  };

  return (
    <div className="w-[400px] rounded-lg overflow-hidden bg-background p-4">
      <Text size="lg">
        <b>Tem certeza de que deseja excluir a ocorrência?</b>
      </Text>

      <br />

      <div className="flex gap-4 justify-end">
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>

        <Button onClick={handleLogout}>Sim</Button>
      </div>
    </div>
  );
}

export default ModalExcluirOcorrencia;
