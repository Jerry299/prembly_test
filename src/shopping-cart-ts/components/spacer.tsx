export const Spacer = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => <div style={{ width, height }} className={className || ""}></div>;
