import Text from "@/components/commons/text";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  desc?: string;
  hideToBack?: boolean;
}

function PageTitle({ title, desc, hideToBack }: Props) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!hideToBack && (
            <Button
              variant="link"
              className="p-0"
              prependIcon={ChevronLeft}
              onClick={() => window.history.back()}
            />
          )}
          <div>
          <Text size="xxl" weight="bold">
            {title}
          </Text>
          <Text className="text-muted-foreground">{desc}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
