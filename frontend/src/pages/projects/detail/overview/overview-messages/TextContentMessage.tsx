import { memo } from "react";
import DetailItem from "../../../../../components/detail-item/DetailItem.tsx";

interface TextContentMessageProps {
  project: any;
}

const TextContentMessage = (props: TextContentMessageProps) => {
  const { project } = props;

  return (
    <>
      {!project?.textContent && (
        <DetailItem
          isPositive={false}
          headerText="Text Content"
          statusText="Not Set"
          descriptionText="You have NOT added text for upload to this project."
        />
      )}

      {project?.textContent && (
        <DetailItem
          isPositive={true}
          headerText="Text Content"
          statusText="Completed"
          descriptionText="You have added text for upload to this project."
        />
      )}
    </>
  );
};

export default memo(TextContentMessage);
