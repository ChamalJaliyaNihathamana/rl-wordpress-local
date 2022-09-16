import * as React from "react";

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactElement;
}

const Title: React.FunctionComponent<TitleProps> = ({
  children,
  className,
  icon = "",
}) => {
  return (
    <h1 className={className}>
      {icon ? <span className="text-icon">{icon}</span> : null}
      {children}
    </h1>
  );
};

export default Title;
