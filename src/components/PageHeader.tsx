import { Button } from "./ui/button";

type PageHeaderProps = {
  header: string;
  subHeader: string;
  buttonText?: string;
  handleClick?: () => void;
};

const PageHeader = ({
  header,
  subHeader,
  buttonText,
  handleClick,
}: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-primary font-semibold text-xl sm:text-2xl md:text-3xl">
          {header}
        </h2>
        <p className="text-text-primary text-xs sm:text-sm md:text-base">
          {subHeader}
        </p>
      </div>
      {buttonText && (
        <div>
          <Button onClick={handleClick}>{buttonText}</Button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
